import EyeTwoTone from '@ant-design/icons/EyeTwoTone'
import cssContent from '@nexys/components/Content/Content.module.scss'
import MyTable from '@nexys/components/MyTable/MyTable'
import useDebounce from '@nexys/hooks/useDebounce/useDebounce'
import useToggle from '@nexys/hooks/useToggle'
import { PageProps } from '@nexys/interface/Page'
import { Button, Col, Input, Modal, Row, Space } from 'antd'
import useRole, { defaultRoleData } from 'data/useRole'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import ApiCall from 'services/ApiCall'
import DetailRole from 'views/Admin/Settings/Account/Role/Detail'

function Role(props: PageProps) {
  const defaultPage = _.get(props, 'defaultPage', 1)
  const defaultPageSize = 10
  const baseURL = `/admin/settings/account/role`

  const [title, setTitle] = useState(undefined)
  const debouncedTitle = useDebounce(title, 500)

  const initialToggle = false
  const stateToggle = useToggle({
    initialToggle,
    initialState: {
      visible: false,
      data: defaultRoleData,
    },
  })

  const queryRole = useRole({
    query: {
      defaultValue: {
        page: Number(defaultPage),
        pageSize: defaultPageSize,
      },
    },
  })
  const { refetch, helpers } = queryRole

  useEffect(() => {
    refetch()

    helpers.setQuery((helper) => {
      helper.query.set('page', undefined)
      helper.filtered.set('name', debouncedTitle)
    })
  }, [debouncedTitle])

  // Mutation Delete
  const multipleDelete = useMutation((listChecked: string | string[]) =>
    ApiCall.Role.multipleForceDelete({ ids: listChecked }),
  )

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Detail',
      accessor: 'detail',
      width: 70,
      Cell: (row) => {
        const { original } = row
        return (
          <Button
            onClick={() =>
              stateToggle.toggle({
                visible: !initialToggle,
                data: original,
              })
            }
            type="link"
            icon={<EyeTwoTone twoToneColor="#52c41a" />}
          />
        )
      },
    },
  ]

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <Row gutter={[16, 16]}>
        <Col>
          <Input
            placeholder="Search Name"
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            value={title}
          />
        </Col>

        <Col flex={'auto'} />

        <MyTable
          baseUrl={baseURL}
          columns={columns}
          query={queryRole}
          mutation={multipleDelete}
        />
      </Row>

      <Modal
        title="Role Detail"
        onCancel={() => stateToggle.toggle({ visible: initialToggle })}
        width={700}
        footer={null}
        className={cssContent.contentModalHeader}
        {...stateToggle.state}
      >
        <DetailRole data={stateToggle.state.data} />
      </Modal>
    </Space>
  )
}

export default Role
