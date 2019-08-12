import Link from 'next/link'
import { withRouter } from 'next/router'

function SmoothLink({ prefetch, href, target, children, router, className }) {
  const from = router.pathname

  return (
    <Link prefetch={prefetch} href={href || from}>
      <a
        disabled={!href}
        className={className}
        target={target}
        onClick={event => !href && event.stopPropagation()}
        onMouseEnter={() => {}}
      >
        {children}
      </a>
    </Link>
  )
}

export default withRouter(SmoothLink)
