import SmoothLink from './SmoothLink'
import { MdHome, MdRssFeed } from 'react-icons/md'
import { IoLogoTwitter } from 'react-icons/io'

export default function SidebarNav() {
  return (
    <div className="sidebar-nav">
      <div className="sidebar-nav-logo" />
      <div className="sidebar-nav-byline">by Alex Zirbel</div>
      <div className="sidebar-nav-icons">
        <SmoothLink prefetch href="/" transition="slide-forward">
          <MdHome size="24px" />
        </SmoothLink>
        <SmoothLink
          target="_blank"
          prefetch
          href="https://twitter.com/alexzirbel/"
        >
          <IoLogoTwitter size="24px" />
        </SmoothLink>
        <SmoothLink prefetch href="/" transition="slide-forward">
          <MdRssFeed size="24px" />
        </SmoothLink>
      </div>
      <br />
      <SmoothLink prefetch href="/graphql-apollo" transition="slide-backward">
        GraphQL Apollo
      </SmoothLink>
      <br />
      <SmoothLink
        prefetch
        href="/side-project-emails"
        transition="slide-forward"
      >
        Side project emails
      </SmoothLink>
    </div>
  )
}
