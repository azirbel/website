import { CSSTransition } from 'react-transition-group'
import React, { useState } from 'react'
import _ from 'lodash'

export default function Banner({ hasRendered, url }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const onImageLoad = () => {
    setImageLoaded(true)
  }
  const showImage = imageLoaded || !hasRendered
  return (
    <div>
      <img
        src={url}
        style={{ width: 0, height: 0, visibility: 'hidden' }}
        onLoad={onImageLoad}
      />
      <CSSTransition
        in={showImage}
        timeout={{ enter: 200, exit: 200 }}
        classNames="transition-opacity"
      >
        {showImage ? (
          <div
            className="banner-image"
            style={{
              backgroundImage: `url(${url})`,
              backgroundPosition: _.includes(url, 'home-banner')
                ? 'top'
                : 'center',
              backgroundSize: 'cover',
            }}
          />
        ) : (
          <div />
        )}
      </CSSTransition>
    </div>
  )
}
