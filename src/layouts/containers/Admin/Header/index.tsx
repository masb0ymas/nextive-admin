import UserOutlined from '@ant-design/icons/UserOutlined'
import BaseHeader from '@nexys/components/BaseHeader/BaseHeader'
import Text from '@nexys/components/Typography/Text'
import { Col, Skeleton, Space } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import useProfile from 'data/useProfile'
import React from 'react'

function Header() {
  const queryProfile = useProfile()
  const { isLoading, data } = queryProfile

  return (
    <BaseHeader style={{ backgroundColor: '#fff' }}>
      <Col flex="auto" />

      <Col xs={12} sm={6} md={12} lg={6} style={{ textAlign: 'right' }}>
        <Space size={10}>
          {isLoading ? (
            <React.Fragment>
              <Skeleton
                paragraph={false}
                title={{ style: { width: 100 } }}
                loading
                active
              />
              <Skeleton
                avatar={{ shape: 'circle' }}
                paragraph={false}
                loading
                active
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Space
                direction="vertical"
                size={2}
                style={{ textAlign: 'right', marginRight: '10px' }}
              >
                <Text bold size={16}>
                  Hey, &nbsp;
                  {data.fullName}
                </Text>
              </Space>

              {/* START: Avatar profile */}
              {/* {isEmpty(profile?.data?.photo) ? ( */}
              <Avatar size={45} icon={<UserOutlined />} />

              {/* END: Avatar profile */}
            </React.Fragment>
          )}
          {/* <Popover
            trigger="click"
            title="Notifikasi"
            overlayStyle={{ width: 250 }}
            content={<Notification data={data} />}
          >
            <Button
              icon={<IconBell />}
              size="large"
              style={{ border: 'none' }}
            />
          </Popover> */}
        </Space>
      </Col>
    </BaseHeader>
  )
}

export default Header
