// WTF now.sh
// See https://github.com/zeit/now-builders/issues/61

const { PHASE_PRODUCTION_SERVER } =
  process.env.NODE_ENV === 'development' ? {} : require('next-server/constants')

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    return {
      /* production only config */
    }
  }
  const withMDX = require('@zeit/next-mdx')({
    extension: /\.(md|mdx)$/,
  })
  const withSass = require('@zeit/next-sass')
  return withSass(withMDX())
}
