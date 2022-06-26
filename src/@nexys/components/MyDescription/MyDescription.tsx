import { formatCurrency, formatCurrencyIDR } from '@nexys/helpers/Currency'
import { Checkbox, Descriptions } from 'antd'
import Link from 'next/link'
import React from 'react'

export interface MyDescriptionProps {
  id: string
  value: any
  checked?: boolean
  number?: boolean
  currency?: boolean
  url?: string
}

function MyDescription(props: MyDescriptionProps) {
  const {
    id,
    value,
    checked = false,
    number = false,
    currency = false,
    url,
  } = props

  function renderValue() {
    if (checked) {
      return <Checkbox checked={value} />
    }

    if (number) {
      return <b>{value && formatCurrency(value)}</b>
    }

    if (currency) {
      return <b>{value && formatCurrencyIDR(value)}</b>
    }

    if (url) {
      return (
        <Link href={url}>
          <a>{value}</a>
        </Link>
      )
    }

    return <b>{value}</b>
  }

  return (
    <Descriptions bordered size="small">
      <Descriptions.Item label={id}>{renderValue()}</Descriptions.Item>
    </Descriptions>
  )
}

export default MyDescription
