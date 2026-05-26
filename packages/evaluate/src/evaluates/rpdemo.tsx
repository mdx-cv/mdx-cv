import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import ReactPDF from '@react-pdf/renderer'
import { Command } from 'commander'
import { BasicDocument } from './react-pdf-doc-examples/basic.js'
import { Quixote } from './react-pdf-doc-examples/quixote.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function main(input: string, output: string) {
  console.log('demo', input)
  if (input === 'basic') {
    await ReactPDF.render(<BasicDocument />, output)
  } else if (input === 'quixote') {
    await ReactPDF.render(<Quixote />, output)
  } else {
    await ReactPDF.render(<BasicDocument />, output)
  }
}

export const rpdemo = new Command('rpdemo')

rpdemo
  .option('-o, --output [path]', 'output path for the generated PDF file')
  .argument('<input>', 'demo name')
  .action(async (input, options) => {
    // const inputDir = dirname(input)
    const output = options.output ?? join(__dirname, '..', 'assets', 'react-pdf_demo.pdf')
    await main(input, output)
  })
