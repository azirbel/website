import { CSSTransition } from 'react-transition-group'
import React, { useState } from 'react'

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
      <CSSTransition in={showImage} timeout={400} classNames="opacity-slow">
        {showImage ? (
          <div
            className="banner-image"
            style={{
              backgroundImage: `url(${url})`,
              backgroundPosition: 'center',
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
