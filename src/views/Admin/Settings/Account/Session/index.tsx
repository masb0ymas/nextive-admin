import MyTable from '@nexys/components/MyTable/MyTable'
import { PageProps } from '@nexys/interface/Page'
import { Row } from 'antd'
import useSession from 'data/useSession'
import _ from 'lodash'
import { useEffect } from 'react'

function Session(props: PageProps) {
  const defaultPage = _.get(props, 'defaultPage', 1)
  const defaultPageSize = 10
  const baseURL = `/admin/settings/account/session`

  const querySession = useSession({
    query: {
      defaultValue: {
        page: Number(defaultPage),
        pageSize: defaultPageSize,
      },
    },
  })
  const { refetch } = querySession

  useEffect(() => {
    refetch()
  }, [])

  const columns = [
    {
      Header: 'Name',
      accessor: 'User.fullName',
    },
    {
      Header: 'Device',
      accessor: 'device',
    },
    {
      Header: 'IP Address',
      accessor: 'ipAddress',
    },
    {
      Header: 'Platform',
      accessor: 'platform',
    },
  ]

  return (
    <Row gutter={[16, 16]}>
      <MyTable
        baseUrl={baseURL}
        columns={columns}
        query={querySession}
        isAdd={false}
        isEdit={false}
        isDeleted={false}
      />
    </Row>
  )
}

export default Session
