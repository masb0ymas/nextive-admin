import cssContent from '@nexys/components/Content/Content.module.scss'
import MyDescription, {
  MyDescriptionProps
} from '@nexys/components/MyDescription/MyDescription'
import Text from '@nexys/components/Typography/Text'
import { Button, Col, Divider, Row } from 'antd'
import { FormikProps } from 'formik'
import React from 'react'
import { useMutation } from 'react-query'
import ActionDelete from './ActionDelete'

interface ActionFormProps {
  initialValues: any
  isEdit?: boolean
  redirectUrl?: string
  formikProps?: FormikProps<any>
  withPublished?: MyDescriptionProps[]
  mutationDelete?: ReturnType<typeof useMutation>
}

function ActionForm(props: ActionFormProps) {
  const {
    isEdit = false,
    initialValues,
    withPublished,
    redirectUrl,
    formikProps,
    mutationDelete,
  } = props

  const { id } = initialValues

  return (
    <div className={cssContent.contentForm}>
      {withPublished && (
        <div style={{ marginBottom: '1rem' }}>
          <Text size={16}>Info</Text>
          <div id={cssContent.customDividerAction}>
            <Divider />
          </div>

          {withPublished &&
            withPublished.map((item) => {
              return <MyDescription id={item.id} value={item.value} {...item} />
            })}
        </div>
      )}

      <Text size={16}>Action</Text>
      <div id={cssContent.customDividerAction}>
        <Divider />
      </div>

      <Row gutter={[16, 16]} style={{ marginTop: '5px' }}>
        <Col xs={12}>
          <Button
            style={{ width: '100%' }}
            type="primary"
            htmlType="button"
            loading={formikProps.isSubmitting}
            onClick={() => {
              formikProps.handleSubmit()
            }}
          >
            Save
          </Button>
        </Col>

        {isEdit && mutationDelete ? (
          <Col xs={12}>
            <ActionDelete
              ids={id}
              redirectUrl={redirectUrl}
              mutationDelete={mutationDelete}
            />
          </Col>
        ) : (
          <React.Fragment />
        )}
      </Row>
    </div>
  )
}

export default ActionForm
