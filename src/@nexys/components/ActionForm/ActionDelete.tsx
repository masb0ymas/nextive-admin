import { Button, notification, Popconfirm } from 'antd'
import _ from 'lodash'
import Router from 'next/router'
import React, { useState } from 'react'
import { useMutation } from 'react-query'

interface ActionDeleteProps {
  ids: string | string[]
  redirectUrl?: string
  mutationDelete?: ReturnType<typeof useMutation>
}

function ActionDelete(props: ActionDeleteProps) {
  const { ids, redirectUrl, mutationDelete } = props

  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  async function handleDelete() {
    setIsLoading(true)

    try {
      const response = await mutationDelete.mutateAsync(ids)
      const message = _.get(response, 'data.message', '')

      notification.success({ message })
      Router.push(redirectUrl)
    } catch (error) {
      const description = error?.response?.data?.message
      notification.error({ message: 'Error', description })
    } finally {
      setIsLoading(false)
      setIsVisible(false)
    }
  }

  return (
    <Popconfirm
      visible={isVisible}
      placement="topRight"
      title="Are you sure you want to delete this data ?"
      onConfirm={() => handleDelete()}
      onCancel={() => setIsVisible(!isVisible)}
      okText="Yes"
      cancelText="No"
    >
      <Button
        danger
        style={{ width: '100%' }}
        onClick={() => setIsVisible(true)}
        loading={isLoading}
      >
        Delete
      </Button>
    </Popconfirm>
  )
}

export default ActionDelete
