import Text from '@nexys/components/Typography/Text'
import { Layout } from 'antd'
import MenuSidebar from 'layouts/containers/Admin/Sidebar/partials/MenuSidebar'
import { useState } from 'react'

const { Sider } = Layout

const brand = process.env.BRAND ?? 'Your Brand'

function Sidebar() {
  const [isCollapse, setIsCollapse] = useState(false)

  return (
    <Sider
      collapsible
      collapsed={isCollapse}
      onCollapse={() => setIsCollapse(!isCollapse)}
    >
      <div
        style={{
          padding: '1rem',
          display: 'flex',
          justifyItems: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {/* <img
          src={'/static/images/nextjs-logo.png'}
          alt={brand}
          style={{ width: '100%' }}
        /> */}

        <Text color="#fff" size={16}>
          {brand}
        </Text>
      </div>

      <MenuSidebar />
    </Sider>
  )
}

export default Sidebar
