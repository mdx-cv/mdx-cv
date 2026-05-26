import { pdf } from '@react-pdf/renderer'
import { ElementMap } from '../../elements/index.js'
import { loadJsx } from './load-jsx.js'
import { mdxToJsx } from './mdx-to-jsx.js'
import { renderMdxToPdf } from './mdx-to-pdf.js'
import { Wrap, type WrapProps } from './Wrap.js'

export type RendererOptions = Omit<WrapProps, 'children'> & {
  debugfile?: boolean
  lang?: string
}

interface IRenderer {
  renderToPdf(): Promise<NodeJS.ReadableStream>
}

export class Renderer implements IRenderer {
  constructor(
    private readonly mdx: string,
    private readonly baseUrl: URL,
    private readonly options: RendererOptions = {},
  ) {}

  async renderToPdf(): Promise<NodeJS.ReadableStream> {
    const jsx = await mdxToJsx(this.mdx)
    if (this.options.debugfile) {
      const { writeFile } = await import('node:fs/promises')
      await writeFile('output.debug.jsx', jsx)
    }
    const MDXComponent = await loadJsx(jsx, this.baseUrl)
    return renderMdxToPdf(MDXComponent, { ...this.options, baseUrl: this.baseUrl })
  }

  async renderToBlob(): Promise<Blob> {
    const jsx = await mdxToJsx(this.mdx)
    const MDXComponent = await loadJsx(jsx, this.baseUrl)
    const props = {
      lang: this.options.lang,
      pageSize: this.options.pageSize,
      baseUrl: this.options.baseUrl,
      components: ElementMap,
    }
    const Doc = (
      <Wrap {...props}>
        <MDXComponent />
      </Wrap>
    )
    const blob = await pdf(Doc).toBlob()
    return blob
  }
}

export function basicRenderer(mdx: string, baseUrl: URL, options: RendererOptions = {}) {
  return new Renderer(mdx, baseUrl, options).renderToPdf()
}
