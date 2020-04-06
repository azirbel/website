// Adapted from https://mdxjs.com/guides/syntax-highlighting

import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import _ from 'lodash'

const Theme = {
  plain: {
    color: 'var(--darkGray)',
    backgroundColor: 'transparent',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: 'var(--mediumDarkGray)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['string', 'attr-value'],
      style: {
        color: 'var(--red)',
      },
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: 'var(--darkGray)',
      },
    },
    {
      types: [
        'entity',
        'url',
        'symbol',
        'number',
        'boolean',
        'variable',
        'constant',
        'property',
        'regex',
        'inserted',
      ],
      style: {
        color: 'var(--primaryColor)',
      },
    },
    {
      types: ['atrule', 'keyword', 'attr-name', 'selector'],
      style: {
        color: 'var(--blue)',
      },
    },
    {
      types: ['function', 'deleted', 'tag'],
      style: {
        color: 'var(--cyanDark)',
      },
    },
    {
      types: ['function-variable'],
      style: {
        color: 'var(--primaryColorDark)',
      },
    },
    {
      types: ['tag', 'selector', 'keyword'],
      style: {
        color: 'var(--primaryColorDark)',
      },
    },
  ],
}

export default ({ children, className }) => {
  const language = (className || '').replace(/language-/, '')

  return (
    <Highlight
      {...defaultProps}
      theme={Theme}
      code={children}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        let numLines = tokens.length

        return (
          <div className={className} style={{ ...style, padding: '8px' }}>
            {_.take(tokens, numLines - 1).map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </div>
        )
      }}
    </Highlight>
  )
}
