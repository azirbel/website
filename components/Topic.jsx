import Layout from '../components/Layout'
import { Helmet } from 'react-helmet'
import STRUCTURE from '../content/structure'
import SmoothLink from '../components/SmoothLink'
import _ from 'lodash'

export default ({ topic, type }) => {
  let posts = []

  if (type === 'tag') {
    posts = _(STRUCTURE)
      .toPairs()
      .filter(([name, meta]) => _.includes(meta['tags'], topic))
      .map(([name, meta]) => name)
      .value()
  } else if (type === 'series') {
    posts = _(STRUCTURE)
      .toPairs()
      .filter(([name, meta]) => meta['series'] === topic)
      .map(([name, meta]) => name)
      .value()
  }

  posts = _.sortBy(posts, p => STRUCTURE[p].date)

  return (
    <Layout>
      <Helmet>
        <title>#{topic}</title>
      </Helmet>
      <h1 style={{ paddingTop: 200 }}>
        {type === 'tag'
          ? `Posts tagged #${topic}`
          : `Posts in the #${topic} series`}
      </h1>
      {posts.map(postSlug => (
        <div>
          <SmoothLink key={postSlug} href={postSlug}>
            {STRUCTURE[postSlug].title}
          </SmoothLink>
        </div>
      ))}
    </Layout>
  )
}
