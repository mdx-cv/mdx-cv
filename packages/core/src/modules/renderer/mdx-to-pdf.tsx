import { renderToStream } from '@react-pdf/renderer'

import { ElementMap } from '../../elements/index.js'
import { Wrap, type WrapProps } from './Wrap.js'

export interface DocumentProps {
  MDXComponent: React.ComponentType<Record<string, never>>
  options: PDFRenderOptions
}
export function Document({ MDXComponent, options }: DocumentProps) {
  const props = {
    lang: options.lang,
    pageSize: options.pageSize,
    baseUrl: options.baseUrl,
    components: ElementMap,
  }
  return (
    <Wrap {...props}>
      <MDXComponent />
    </Wrap>
  )
}

type PDFRenderOptions = Omit<WrapProps, 'children'>
export async function renderMdxToPdf(
  MDXComponent: React.ComponentType<Record<string, never>>,
  options: PDFRenderOptions,
) {
  return await renderToStream(<Document MDXComponent={MDXComponent} options={options} />)
}
