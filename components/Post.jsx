import Layout from '../components/Layout'
import { Helmet } from 'react-helmet'
import SmoothLink from './SmoothLink'

export default ({ Content, meta }) => (
  <Layout>
    <Helmet>
      <title>{meta.title}</title>
    </Helmet>
    <h1>{meta.title}</h1>
    <div className="hidden-desktop">by Alex Zirbel</div>
    <Content />
    <div className="posted-on">
      Posted on{' '}
      {new Date(meta.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
    </div>
    <div className="post-footer">
      <img height="36" src="/static/img/logo2019.png" />
      <p>
        Hi, I'm <SmoothLink href="/">Alex Zirbel</SmoothLink>. I'm an
        independent
        <br />
        software developer based in San Francisco.
      </p>
      <div>
        Say hello on twitter —{' '}
        <a target="_blank" href="https://twitter.com/alexzirbel">
          @alexzirbel
        </a>
      </div>
    </div>
  </Layout>
)
