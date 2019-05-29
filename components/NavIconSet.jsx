import SmoothLink from './SmoothLink'
import { MdHome, MdRssFeed } from 'react-icons/md'
import { IoLogoTwitter } from 'react-icons/io'

export default () => {
  return (
    <div className="nav-icons">
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
  )
}
