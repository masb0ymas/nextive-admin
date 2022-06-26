import cssLoading from '@nexys/components/Loading/Loading.module.scss'
import { Spin } from 'antd'
import cx from 'classnames'
import React from 'react'

const Loading = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className={cx(cssLoading.loading)} ref={ref}>
      <Spin size="large" />
      <p>Loading...</p>
    </div>
  )
}) as any

export default Loading
