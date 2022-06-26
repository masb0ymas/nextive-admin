import { Layout } from 'antd'
import React from 'react'

const { Footer: AntFooter } = Layout

function Footer() {
  const dateNow = new Date()
  const yearNow = dateNow.getFullYear()

  return (
    <AntFooter style={{ textAlign: 'center' }}>
      &copy; {`${yearNow} Created By `}
      <b>NextJS</b>
    </AntFooter>
  )
}

export default Footer
