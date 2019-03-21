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

const buildTopic = (topic, topicType) => `
/*
 * 
 * 
 * 
 * WARNING:
 * Auto-generated from posts tagged ${topic} by yarn build:content
 * 
 * 
 * 
 */
  
import Topic from '../components/Topic'

export default () => <Topic topic="${topic}" type="${topicType}" />
`

fileNames = fs.readdirSync('./content')
contentFileNames = []
allTags = []
allSeries = []
fileNames.forEach(fileName => {
  if (fileName.endsWith('mdx')) {
    console.log(`Compiling ${fileName}`)
    const pageName = fileName.replace(/mdx$/, 'jsx')

    const fileData = fs.readFileSync(`./content/${fileName}`, 'utf8')
    const tagsMatch = fileData.match(/tags..\[([^\]]*)\]/)
    const tags = tagsMatch[1].replace(/'| /g, '').split(',')
    const seriesMatch = fileData.match(/series..'([^']*)'/)
    const series = seriesMatch && seriesMatch[1]
    allTags = _.compact(_.uniq(allTags.concat(tags)))
    allSeries = _.compact(_.uniq(allSeries.concat([series])))

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
allTags.forEach(tag =>
  fs.writeFileSync(
    `./pages/${tag}.jsx`,
    prettier.format(
      buildTopic(tag, 'tag'),
      _.merge({ parser: 'babel' }, prettierConfig)
    )
  )
)
allSeries.forEach(series =>
  fs.writeFileSync(
    `./pages/${series}.jsx`,
    prettier.format(
      buildTopic(series, 'series'),
      _.merge({ parser: 'babel' }, prettierConfig)
    )
  )
)
fs.writeFileSync(
  './content/structure.js',
  prettier.format(
    buildStructure(contentFileNames),
    _.merge({ parser: 'babel' }, prettierConfig)
  )
)
