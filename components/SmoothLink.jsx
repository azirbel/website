import Link from 'next/link'
import { NextTransitionContext } from '../pages/_app'
import { withRouter } from 'next/router'
import STRUCTURE from '../content/structure'

function SmoothLink({ prefetch, href, target, children, router }) {
  const from = router.pathname
  const to = href

  const fromMeta = STRUCTURE[from]
  const toMeta = STRUCTURE[to]

  let nextTransition = 'none'

  if (from === to) {
    nextTransition = 'none'
  } else if (toMeta && fromMeta) {
    nextTransition =
      toMeta.date > fromMeta.date ? 'slide-forward' : 'slide-backward'
  } else if (to === '/' || from === '/') {
    nextTransition = 'opacity-in'
  }

  return (
    <NextTransitionContext.Consumer>
      {({ updateNextTransition }) => (
        <Link prefetch={prefetch} href={href}>
          <a
            target={target}
            onMouseEnter={() => {
              updateNextTransition(nextTransition)
            }}
          >
            {children}
          </a>
        </Link>
      )}
    </NextTransitionContext.Consumer>
  )
}

export default withRouter(SmoothLink)
