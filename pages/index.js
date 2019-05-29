import Layout from '../components/Layout'
import { Helmet } from 'react-helmet'
import PostLink from '../components/PostLink'
import STRUCTURE from '../content/structure'
import _ from 'lodash'

const PROJECTS = ['/touch-bar-timer', '/npoint']

const STORY = [
  '/escape-the-about-page-1',
  '/escape-the-about-page-2',
  '/return-to-the-about-page',
]

export default () => (
  <Layout>
    <Helmet>
      <title>Alex Zirbel</title>
    </Helmet>
    <h1 style={{ paddingTop: 20 }}>Welcome!</h1>
    <p>I’m Alex Zirbel, an independent software developer based in SF.</p>
    <p>
      I’m a full-stack developer who likes to focus on product and design.
      Outside of work I love bouldering and live music.
    </p>
    <h2>Projects</h2>
    {PROJECTS.map(postSlug => (
      <PostLink key={postSlug} postSlug={postSlug} />
    ))}
    <h2>Story</h2>
    {STORY.map(postSlug => (
      <PostLink key={postSlug} postSlug={postSlug} />
    ))}
    <h2>Other posts</h2>
    {_.keys(STRUCTURE)
      .filter(k => !_.includes(PROJECTS, k) && !_.includes(STORY, k))
      .map(postSlug => (
        <PostLink key={postSlug} postSlug={postSlug} />
      ))}
  </Layout>
)
