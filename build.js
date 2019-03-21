const fs = require('fs')
const _ = require('lodash')
const prettier = require('prettier')
const prettierConfig = require('./.prettierrc.json')

const buildPage = fileName => `
/*
 * 
 * 
 * 
 * WARNING:
 * Auto-generated from ${fileName} by yarn build:content
 * 
 * 
 * 
 */

import Content, { meta } from '../content/${fileName}'
import Post from '../components/Post'

export default () => <Post Content={Content} meta={meta} />

`

const buildStructure = fileNames => {
  const importLines = []
  const mappingLines = []

  fileNames.forEach(fileName => {
    const camelName = _.camelCase(fileName)
    const baseName = fileName.replace(/.mdx$/, '')
    importLines.push(`import { meta as ${camelName} } from './${fileName}'`)
    mappingLines.push(`'/${baseName}': ${camelName},`)
  })

  return `
/*
 * 
 * 
 * 
 * WARNING:
 * Auto-generated from content/*.mdx by yarn build:content
 * 
 * 
 * 
 */

${importLines.join('\n')}

export default {
  ${mappingLines.join('\n')}
}
`
}

fileNames = fs.readdirSync('./content')
contentFileNames = []
fileNames.forEach(fileName => {
  if (fileName.endsWith('mdx')) {
    console.log(`Compiling ${fileName}`)
    const pageName = fileName.replace(/mdx$/, 'jsx')
    fs.writeFileSync(
      `./pages/${pageName}`,
      prettier.format(
        buildPage(fileName),
        _.merge({ parser: 'babel' }, prettierConfig)
      )
    )
    contentFileNames.push(fileName)
  }
})
fs.writeFileSync(
  './content/structure.js',
  prettier.format(
    buildStructure(contentFileNames),
    _.merge({ parser: 'babel' }, prettierConfig)
  )
)
