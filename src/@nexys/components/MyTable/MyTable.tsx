import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditTwoTone from '@ant-design/icons/EditTwoTone'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import ConstRole from '@nexys/constants/ConstRole'
import Paginations, { getNumber } from '@nexys/helpers/Paginations'
import useUrlQuery from '@nexys/hooks/useUrlQuery/useUrlQuery'
import { Button, Checkbox, Col, notification, Popconfirm } from 'antd'
import useProfile from 'data/useProfile'
import _ from 'lodash'
import Link from 'next/link'
import React, { useState } from 'react'
import { QueryObserverBaseResult, useMutation } from 'react-query'
import { Column } from 'react-table-6'
import MyPagination from '../MyPagination/MyPagination'
import Table from '../Table/Table'

type Query = QueryObserverBaseResult & {
  data: any[]
  helpers: ReturnType<typeof useUrlQuery>
  total: number
}

interface MyTableProps {
  baseUrl: string
  query: Query
  columns: Column<any>[]
  mutation: ReturnType<typeof useMutation>
}

function MyTable(props: MyTableProps) {
  const { baseUrl, columns, query, mutation } = props

  const { data, refetch, isLoading: queryLoading, helpers } = query

  const defaultPageSize = 10

  const [checked, setChecked] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckedAll, setIsCheckedAll] = useState(false)

  const queryProfile = useProfile()
  const { data: dataProfile } = queryProfile

  function handleMultiCheck(e) {
    let selected = [...checked]
    const isCheck = e.target.checked

    for (let i = 0; i < data.length; i += 1) {
      const item = data[i]
      // checked or unchecked
      if (isCheck) {
        selected.push(item.id)
      } else {
        selected = []
      }
    }

    // pick unique item array
    const uniqSelected = [...new Set(selected)]

    setIsCheckedAll(!isCheckedAll)
    setChecked(uniqSelected)
  }

  function handleSingleCheck(id: string) {
    // index dari id yg dipilih didalam array checked
    // if key index >= 0 splice index else push ke checked
    const selected = [...checked]
    const keyIndex = selected.indexOf(id)

    if (keyIndex > -1) {
      selected.splice(keyIndex, 1)
    } else {
      selected.push(id)
    }
    setChecked(selected)
  }

  async function handleDelete(listChecked: string[]) {
    if (!_.isEmpty(listChecked)) {
      setIsLoading(true)

      try {
        const response = await mutation.mutateAsync(listChecked)
        const message = _.get(response, 'data.message', '')
        notification.success({ message })
      } catch (error) {
        const description = error?.response?.data?.message
        notification.error({ message: 'Error', description })
      } finally {
        // refetch after delete data
        refetch()
        setIsCheckedAll(false)
        setIsLoading(false)
        setChecked([])
        setIsVisible(false)
      }
    } else {
      setIsVisible(false)
      notification.warning({
        message: 'Select a data / record to be deleted',
      })
    }
  }

  const defaultColumns = [
    {
      Header: () => (
        <Checkbox
          onChange={(e) => handleMultiCheck(e)}
          checked={isCheckedAll}
        />
      ),
      accessor: 'id',
      width: 70,
      Cell: (row) => {
        const { value } = row
        return (
          <Checkbox
            checked={checked.includes(value)}
            onChange={() => handleSingleCheck(value)}
          />
        )
      },
    },
    {
      Header: 'No.',
      accessor: 'no',
      width: 70,
      Cell: (row) => {
        const { index, pageSize } = row
        const page = helpers.getQueryById('page')
        return getNumber(page, pageSize, index)
      },
    },
  ]

  const actionColumns = [
    {
      Header: 'Edit',
      accessor: 'edit',
      width: 70,
      Cell: (row) => {
        const { original } = row
        const page = helpers.getQueryById('page') || 1

        const directTo = `${baseUrl}/edit/${original?.id}?redirectUrl=${baseUrl}?page=${page}`

        return (
          <Link href={directTo}>
            <a>
              <Button type="link" icon={<EditTwoTone />} />
            </a>
          </Link>
        )
      },
    },
  ]

  const newColumns = [...defaultColumns, ...columns, ...actionColumns]

  return (
    <React.Fragment>
      {/* Only Super Admin */}
      {dataProfile.RoleId === ConstRole.ID_SUPER_ADMIN && (
        <Col flex="auto">
          <Popconfirm
            visible={isVisible}
            title="Are you sure you want to delete this data ?"
            onConfirm={() => handleDelete(checked)}
            onCancel={() => setIsVisible(!isVisible)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              loading={isLoading}
              onClick={() => setIsVisible(true)}
            >
              Delete
            </Button>
          </Popconfirm>
        </Col>
      )}

      <Col flex="auto" />

      <Col>
        <Link href={`${baseUrl}/add`}>
          <a>
            <Button type="primary" icon={<PlusOutlined />}>
              Add
            </Button>
          </a>
        </Link>
      </Col>

      <Col xs={24}>
        <Table
          columns={newColumns}
          data={data}
          defaultPageSize={defaultPageSize}
          className="-highlight"
          loading={queryLoading}
        />
      </Col>

      <Col xs={24} style={{ textAlign: 'right' }}>
        <MyPagination {...Paginations.getPaginationProps(query)} />
      </Col>
    </React.Fragment>
  )
}

export default MyTable
