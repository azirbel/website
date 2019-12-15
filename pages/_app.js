import App, { Container } from 'next/app'
import React from 'react'
import { PageTransition } from 'next-page-transitions'
import { CSSTransition } from 'react-transition-group'
import STRUCTURE from '../content/structure'
import _ from 'lodash'
import SmoothLink from '../components/SmoothLink'
import { MDXProvider } from '@mdx-js/tag'
import Head from 'next/head'
import Router from 'next/router'

import '../styles/index.scss'
import Banner from '../components/Banner'
import SidebarNav from '../components/SidebarNav'
import Header from '../components/Header'

const MDX_COMPONENTS = {
  a: SmoothLink,
}

export default class MyApp extends App {
  state = {
    hasRendered: false,
    nextTransition: 'none',
  }

  componentDidMount() {
    Router.events.on('routeChangeStart', url => {
      this.updateTransitionFromRouteChange(url)
    })

    // TODO(azirbel): Do we still need this?
    this.setState({ hasRendered: true })

    // TODO(azirbel): Remove this and add a toggle.
    // But it should also persist in a cookie and work without JS...
    // document.documentElement.setAttribute('data-theme', 'dark')
  }

  // Use something like this to prevent re-renders when we change the "which direction" state
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.hasRendered !== nextState.hasRendered) {
      return false
    }
    if (this.state.nextTransition !== nextState.nextTransition) {
      return false
    }
    return true
  }

  updateTransitionFromRouteChange = to => {
    const from = this.props.router.pathname
    const fromMeta = STRUCTURE[from]
    const toMeta = STRUCTURE[to]

    let nextTransition = 'none'

    if (from === to) {
      nextTransition = 'none'
    } else if (toMeta && fromMeta) {
      nextTransition =
        toMeta.date > fromMeta.date ? 'slide-forward' : 'slide-backward'
    } else if (fromMeta && !toMeta) {
      nextTransition = 'slide-up'
    } else if (!fromMeta && toMeta) {
      nextTransition = 'slide-down'
    } else {
      nextTransition = 'opacity'
    }

    if (nextTransition !== this.state.nextTransition) {
      this.setState({
        nextTransition: nextTransition,
      })
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
          <link
            rel="icon"
            type="image/png"
            href="/static/favicon.png"
            sizes="32x32"
          />
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charSet="utf-8"
          />
        </Head>

        <div className="main">
          <div className="left-sidebar" />
          <div className="content">
            <CSSTransition
              in={!!currentMeta.bannerUrl}
              classNames={`opacity`}
              timeout={{ enter: 200, exit: 180 }}
            >
              <div>
                <div className="banner-bg">
                  <Banner
                    key={currentMeta.bannerUrl}
                    url={currentMeta.bannerUrl}
                    hasRendered={this.state.hasRendered}
                  />
                </div>
              </div>
            </CSSTransition>
            <div className="post">
              <MDXProvider components={MDX_COMPONENTS}>
                <PageTransition
                  timeout={{ enter: 200, exit: 100 }}
                  classNames={`page-${this.state.nextTransition}`}
                >
                  <Component {...pageProps} key={router.route} />
                </PageTransition>
              </MDXProvider>
            </div>
          </div>
          <div className="right-sidebar">
            <SidebarNav postName={router.pathname} meta={currentMeta} />
          </div>
        </div>
      </Container>
    )
  }
}
