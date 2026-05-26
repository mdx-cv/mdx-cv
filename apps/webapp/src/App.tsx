import '@mdxeditor/editor/style.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import './App.css'
import { Renderer } from '@mdx-cv/core'
import {
  BoldItalicUnderlineToggles,
  DiffSourceToggleWrapper,
  diffSourcePlugin,
  headingsPlugin,
  listsPlugin,
  MDXEditor,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from '@mdxeditor/editor'
import pdfWorkerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { useEffect, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc

const BASE_URL = new URL('file:///tmp/resume.mdx')

function App() {
  const [markdown, setMarkdown] = useState(`# Hello World`)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  useEffect(() => {
    if (!markdown.trim()) {
      return
    }
    const renderer = new Renderer(markdown, BASE_URL, { debugfile: true })
    renderer.renderToBlob().then((blob) => {
      console.log('PDF blob created:', blob)
      const url = URL.createObjectURL(blob)
      console.log('PDF URL:', url)
      setPdfUrl(url)
    })
  }, [markdown])

  return (
    <div className="h-screen p-4">
      <div className="w-full h-full flex items-center justify-center gap-4 border-2 rounded border-slate-100 p-2">
        <div className="w-1/2 h-full border rounded border-slate-200">
          <MDXEditor
            className="h-full editor-shell"
            contentEditableClassName="prose"
            markdown={markdown}
            plugins={[
              headingsPlugin(),
              listsPlugin(),
              quotePlugin(),
              thematicBreakPlugin(),
              markdownShortcutPlugin(),
              toolbarPlugin({
                toolbarContents: () => (
                  <DiffSourceToggleWrapper>
                    <UndoRedo />
                    <BoldItalicUnderlineToggles />
                  </DiffSourceToggleWrapper>
                ),
              }),
              diffSourcePlugin(),
            ]}
            onChange={setMarkdown}
          />
        </div>
        <div className="w-1/2 h-full border rounded border-slate-200">
          <div className="h-full">
            {pdfUrl && (
              <Document
                file={pdfUrl}
                onLoadSuccess={() => {
                  console.log('PDF loaded successfully')
                }}
                onLoadError={(error) => {
                  console.error('Error loading PDF:', error)
                }}
              >
                <Page pageNumber={1} />
              </Document>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
