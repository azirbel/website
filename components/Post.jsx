import Layout from '../components/Layout'
import { Helmet } from 'react-helmet'

export default ({ Content, meta }) => (
  <Layout>
    <Helmet>
      <title>{meta.title}</title>
    </Helmet>
    <h1>{meta.title}</h1>
    <div className="hidden-desktop">by Alex Zirbel</div>
    <Content />
  </Layout>
)
