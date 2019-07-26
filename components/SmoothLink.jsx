import Link from 'next/link'
import { withRouter } from 'next/router'

function SmoothLink({ prefetch, href, target, children, router, className }) {
  return (
    <Link prefetch={prefetch} href={href || router.pathname}>
      <a
        disabled={!href}
        className={className}
        target={target}
        onClick={event => !href && event.stopPropagation()}
      >
        {children}
      </a>
    </Link>
  )
}

export default withRouter(SmoothLink)
