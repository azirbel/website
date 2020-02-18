import Layout from '../components/Layout'
import { Helmet } from 'react-helmet'
import STRUCTURE from '../content/structure'
import _ from 'lodash'
import PostLink from './PostLink'

export default ({ topic, type }) => {
  let posts = []

  if (type === 'tag') {
    posts = _(STRUCTURE)
      .toPairs()
      .filter(([_name, meta]) => _.includes(meta['tags'], topic))
      .map(([name, _meta]) => name)
      .value()
  } else if (type === 'series') {
    posts = _(STRUCTURE)
      .toPairs()
      .filter(([_name, meta]) => meta['series'] === topic)
      .map(([name, _meta]) => name)
      .value()
  }

  posts = _.sortBy(posts, p => STRUCTURE[p].date)

  return (
    <Layout>
      <Helmet>
        <title>#{topic}</title>
      </Helmet>
      <h1>
        {type === 'tag'
          ? `Posts tagged #${topic}`
          : `Posts in the #${topic} series`}
      </h1>
      {posts.map(postSlug => (
        <PostLink key={postSlug} postSlug={postSlug} />
      ))}
    </Layout>
  )
}
