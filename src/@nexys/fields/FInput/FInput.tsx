import useTitleAndError, {
  UseTitleAndErrorProps,
} from '@nexys/fields/useTitleAndError/useTitleAndError'
import { Input } from 'antd'
import { InputProps } from 'antd/lib/input'
import { FormikContextType, useField } from 'formik'
import React from 'react'

export type FInputProps = InputProps &
  UseTitleAndErrorProps & {
    name: string
    /**
     * Formik Context
     */
    formik?: FormikContextType<any>
  }

function FInput(props: FInputProps) {
  const [field] = useField(props as any)
  const [title, error] = useTitleAndError(props)

  return (
    <React.Fragment>
      {title}
      <Input {...field} {...props} />
      {error}
    </React.Fragment>
  )
}

export default FInput
