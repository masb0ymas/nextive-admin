import cssContent from '@nexys/components/Content/Content.module.scss'
import { Descriptions } from 'antd'
import { RoleEntity } from 'data/useRole'
import React from 'react'

interface DetailRoleProps {
  data: RoleEntity
}

function DetailRole(props: DetailRoleProps) {
  const { data } = props
  return (
    <div className={cssContent.contentModal}>
      <Descriptions bordered size="small">
        <Descriptions.Item label="Name">
          <b>{data?.name}</b>
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default DetailRole
