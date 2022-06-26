/* eslint-disable react/jsx-curly-newline */
import EyeTwoTone from '@ant-design/icons/EyeTwoTone'
import cssContent from '@nexys/components/Content/Content.module.scss'
import MyTable from '@nexys/components/MyTable/MyTable'
import Lists from '@nexys/helpers/Lists'
import formatPhone from '@nexys/helpers/Phone'
import useDebounce from '@nexys/hooks/useDebounce/useDebounce'
import useToggle from '@nexys/hooks/useToggle'
import { Button, Checkbox, Col, Input, Modal, Row, Select, Space } from 'antd'
import useRole from 'data/useRole'
import useUser from 'data/useUser'
import { get } from 'lodash'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import ApiCall from 'services/ApiCall'
import DetailUser from 'views/Admin/Settings/Account/Users/Detail'

interface UsersProps {
  defaultPage: number
}

const defaultData = {
  id: null,
  fullName: null,
  email: null,
  phone: null,
  picturePath: null,
  address: null,
  RoleId: null,
  Role: null,
  referralCode: null,
  createdAt: null,
  updatedAt: null,
  deletedAt: null,
}

function Users(props: UsersProps) {
  const defaultPage = get(props, 'defaultPage', 1)
  const defaultPageSize = 10
  const baseUrlPage = `/admin/settings/account/users`

  const [email, setEmail] = useState(undefined)
  const [phone, setPhone] = useState(undefined)

  const debouncedEmail = useDebounce(email, 500)
  const debouncedPhone = useDebounce(phone, 500)

  const initialToggle = false
  const stateToggle = useToggle({
    initialToggle,
    initialState: {
      visible: false,
      data: defaultData,
    },
  })

  const queryUser = useUser({
    query: {
      defaultValue: {
        page: Number(defaultPage),
        pageSize: defaultPageSize,
      },
    },
  })
  const { refetch, helpers } = queryUser

  useEffect(() => {
    refetch()

    helpers.setQuery((helper) => {
      helper.query.set('page', undefined)
      helper.filtered.set('email', debouncedEmail)
      helper.filtered.set('phone', debouncedPhone)
    })
  }, [debouncedEmail, debouncedPhone])

  const queryRole = useRole({
    query: {
      defaultValue: {
        pageSize: 9999,
      },
    },
  })

  const optRole = Lists.transform(queryRole.data, 'name', 'id')

  // Mutation Delete
  const multipleDelete = useMutation((listChecked: string | string[]) =>
    ApiCall.User.multipleForceDelete({ ids: listChecked }),
  )

  const columns = [
    {
      Header: 'Name',
      accessor: 'fullName',
      width: 180,
    },
    {
      Header: 'Email',
      accessor: 'email',
      width: 180,
    },
    {
      Header: 'Phone',
      accessor: 'phone',
      width: 180,
      Cell: (row) => {
        const { value } = row
        return formatPhone(value)
      },
    },
    {
      Header: 'Active',
      accessor: 'isActive',
      Cell: (row) => {
        const { value } = row
        return <Checkbox checked={value} />
      },
    },
    {
      Header: 'Role',
      accessor: 'Role.name',
      width: 180,
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
            placeholder="Search Email"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            value={email}
          />
        </Col>

        <Col>
          <Input
            placeholder="Search Phone"
            onChange={(e) => {
              setPhone(e.target.value)
            }}
            value={phone}
          />
        </Col>

        <Col xs={5}>
          <Select
            options={optRole}
            placeholder="Choose Role"
            allowClear
            style={{ width: '100%' }}
            onChange={(value) => {
              queryUser.helpers.setQuery((helper) => {
                helper.query.set('page', undefined)
                helper.query.set('type', undefined)
                helper.filtered.set('User.RoleId', value)
              })
            }}
          />
        </Col>

        <MyTable
          baseUrl={baseUrlPage}
          columns={columns}
          query={queryUser}
          mutation={multipleDelete}
        />
      </Row>

      <Modal
        title="User Detail"
        onCancel={() => stateToggle.toggle({ visible: initialToggle })}
        width={700}
        footer={null}
        className={cssContent.contentModalHeader}
        {...stateToggle.state}
      >
        <DetailUser data={stateToggle.state.data} />
      </Modal>
    </Space>
  )
}

export default Users
