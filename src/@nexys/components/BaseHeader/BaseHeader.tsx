/* eslint-disable react/no-unstable-nested-components */
import Content, { ContentProps } from '@nexys/components/Content/Content'
import { Row } from 'antd'
import cx from 'classnames'
import cssHeader from 'layouts/containers/Public/Header/Header.module.scss'
import React, { ReactNode } from 'react'

export interface BaseHeaderProps extends ContentProps {
  children?: ReactNode
  style?: CSSStyleDeclaration | any
  absolute?: boolean
}

const BaseHeader = function (props: BaseHeaderProps) {
  const {
    absolute,
    children,
    className,
    style,
    styleContainer,
    ...otherProps
  } = props

  return (
    <Content
      {...otherProps}
      component={(props) => <header {...props} />}
      className={cx(cssHeader.container, className)}
      style={{
        padding: 0,
        ...style,
      }}
      styleContainer={{
        ...(absolute
          ? {
              position: 'absolute',
              top: 0,
              width: '100%',
            }
          : {}),
        ...styleContainer,
      }}
    >
      <div>
        <Row
          justify={'space-between'}
          align={'middle'}
          style={{
            padding: '8px',
            height: 56,
          }}
        >
          {children}
        </Row>
      </div>
    </Content>
  )
}

export default BaseHeader
