import App, { Container } from 'next/app'
import React from 'react'
import { PageTransition } from 'next-page-transitions'
import STRUCTURE from '../content/structure'
import _ from 'lodash'
import AnimateHeight from 'react-animate-height'
import SmoothLink from '../components/SmoothLink'
import { MDXProvider } from '@mdx-js/tag'
import Head from 'next/head'

import '../styles/index.scss'
import Banner from '../components/Banner'
import SidebarNav from '../components/SidebarNav'

export const NextTransitionContext = React.createContext()

const MDX_COMPONENTS = {
  a: SmoothLink,
}

export default class MyApp extends App {
  state = {
    hasRendered: false,
    transitionClass: 'none',
  }

  componentDidMount() {
    this.setState({ hasRendered: true })
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
    if (this.state.transitionClass !== 'none') {
      this.setState({ transitionClass: 'none' })
    }
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
        </Head>
        <NextTransitionContext.Provider
          value={{
            updateNextTransition: this.updateNextTransition,
          }}
        >
          <div className="main">
            <div className="left-sidebar" />
            <div className="content">
              <AnimateHeight
                duration={200}
                height={currentMeta.bannerColor ? 'auto' : 0}
              >
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
              <SidebarNav />
            </div>
          </div>
        </NextTransitionContext.Provider>
      </Container>
    )
  }
}
