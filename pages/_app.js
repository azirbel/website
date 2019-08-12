import App, { Container } from 'next/app'
import React from 'react'
import { PageTransition } from 'next-page-transitions'
import STRUCTURE from '../content/structure'
import _ from 'lodash'
import AnimateHeight from 'react-animate-height'
import SmoothLink from '../components/SmoothLink'
import { MDXProvider } from '@mdx-js/tag'
import Head from 'next/head'
import Router from 'next/router'

import '../styles/index.scss'
import Banner from '../components/Banner'
import SidebarNav from '../components/SidebarNav'
import Header from '../components/Header'

export const NextTransitionContext = React.createContext()

const MDX_COMPONENTS = {
  a: SmoothLink,
}

/*
Useful router events:
https://github.com/zeit/next.js/#router-events
https://github.com/zeit/next.js#intercepting-popstate
*/

export default class MyApp extends App {
  state = {
    hasRendered: false,
    transitionClass: 'none',
  }

  componentDidMount() {
    // Router.beforePopState(({ url, as, options }) => {
    //   console.log('before ', url, as, options)
    //   return true
    // })
    Router.events.on('routeChangeStart', url => {
      console.log('App is changing to: ', url)
      this.updateTransitionFromRouteChange(url)
    })
    this.setState({ hasRendered: true })

    document.documentElement.setAttribute('data-theme', 'dark')
  }

  // Use something like this to prevent re-renders when we change the "which direction" state
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.hasRendered !== nextState.hasRendered) {
      return false
    }
    if (this.state.transitionClass !== nextState.transitionClass) {
      return false
    }
    return true
  }

  componentDidUpdate() {
    // TODO(azirbel): Keep the same transition if the mouse hasn't moved after render
    // E.g. clicking through a topic
    // Not sure if this creates other bugs (I think if you nav to the same url you are at, it's a bug)
    // if (this.state.transitionClass !== 'none') {
    //   this.setState({ transitionClass: 'none' })
    // }
  }

  updateTransitionFromRouteChange = to => {
    const from = this.props.router.pathname
    console.log(from, to)

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
    console.log('Next:', nextTransition)
    this.updateNextTransition(nextTransition)
  }

  updateNextTransition = transitionClass => {
    if (transitionClass !== this.state.transitionClass) {
      this.setState({ transitionClass })
    }
  }

  render() {
    const { Component, pageProps, router } = this.props
    let currentMeta = {}

    if (STRUCTURE[router.pathname]) {
      currentMeta = STRUCTURE[router.pathname]
    }

    return (
      <Container>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charSet="utf-8"
          />
        </Head>
        <NextTransitionContext.Provider
          value={{
            updateNextTransition: () => {},
          }}
        >
          <div className="main">
            <div className="left-sidebar" />
            <div className="content">
              <AnimateHeight duration={200} height="auto">
                {currentMeta.bannerColor ? (
                  <div
                    className="banner-bg"
                    style={{
                      backgroundColor: currentMeta.bannerColor,
                    }}
                  >
                    <Banner
                      key={currentMeta.bannerUrl}
                      backgroundColor={currentMeta.bannerColor}
                      url={currentMeta.bannerUrl}
                      hasRendered={this.state.hasRendered}
                    />
                  </div>
                ) : (
                  <Header />
                )}
              </AnimateHeight>
              <div className="post">
                <MDXProvider components={MDX_COMPONENTS}>
                  <PageTransition
                    timeout={200}
                    classNames={this.state.transitionClass}
                  >
                    <Component {...pageProps} />
                  </PageTransition>
                </MDXProvider>
              </div>
            </div>
            <div className="right-sidebar">
              <SidebarNav postName={router.pathname} meta={currentMeta} />
            </div>
          </div>
        </NextTransitionContext.Provider>
      </Container>
    )
  }
}
