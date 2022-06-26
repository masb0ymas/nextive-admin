import useTitleAndError, {
  UseTitleAndErrorProps,
} from '@nexys/fields/useTitleAndError/useTitleAndError'
import { Select } from 'antd'
import { SelectProps, SelectValue } from 'antd/lib/select'
import { useField } from 'formik'
import React from 'react'

type FSelectProps<VT extends SelectValue = SelectValue> = SelectProps<VT> &
  UseTitleAndErrorProps & { onAfterChange?: any }

function FSelect(props: FSelectProps) {
  const [field, , helpers] = useField(props as any)
  const [title, error] = useTitleAndError(props)
  const { onAfterChange } = props

  return (
    <React.Fragment>
      {title}
      <Select
        {...field}
        onBlur={() => {
          helpers.setTouched(true)
        }}
        onClear={() => {
          helpers.setTouched(true)
        }}
        onChange={(value) => {
          helpers.setValue(value)
          if (onAfterChange) {
            onAfterChange(value)
          }
        }}
        {...props}
      />
      {error}
    </React.Fragment>
  )
}

export default FSelect
