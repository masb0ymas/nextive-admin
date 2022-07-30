import { Col, Input, List, Pagination, Row } from 'antd'
import useRole from 'data/useRole'
import { useMemo } from 'react'

function BasicViewData() {
  /*
   url?page=1&pageSize=10
   */
  const qRole = useRole(
    {
      query: {
        initialValue: {
          page: 1,
          pageSize: 10,
        },
      },
    },
    {
      keepPreviousData: true,
    },
  )

  const { page, pageSize } = qRole.helpers.query.get()

  const [curPage, curPageSize] = useMemo(() => {
    return [page, pageSize]
  }, [qRole.dataUpdatedAt])

  return (
    <List
      header={
        <Row gutter={[0, 10]}>
          <Col xs={24}>
            <Input.Search
              style={{ maxWidth: 500 }}
              placeholder={'Cari Role'}
              onChange={(event) => {
                const { value } = event.target
                qRole.helpers.setQuerySyncDebounce((helper) => {
                  helper.filtered.set('name', value)
                  helper.query.set('page', 1)
                })
              }}
            />
          </Col>
          <Col xs={24}>
            <Pagination
              onChange={(page, pageSize) => {
                qRole.helpers.setQuerySync((helper) => {
                  helper.query.set('page', page)
                  helper.query.set('pageSize', pageSize)
                })
              }}
              disabled={qRole.isLoading || qRole.isPreviousData}
              pageSize={pageSize || 10}
              current={page || 1}
              total={qRole.total}
              showSizeChanger
              showTotal={(total, range) => {
                return `${range.join('-')} of ${total}`
              }}
            />
          </Col>
        </Row>
      }
      dataSource={qRole.data}
      loading={qRole.isLoading || qRole.isPreviousData}
      renderItem={(role, index) => {
        return (
          <List.Item>
            <List.Item.Meta
              avatar={index + 1 + (curPage - 1) * curPageSize}
              title={role.name}
            />
          </List.Item>
        )
      }}
    />
  )
}

export const $metadata = {
  title: 'Basic Get Data (Filter/Pagination)',
  description: 'This example show you how to use react-query with querying',
}

export default BasicViewData
