import LockOutlined from '@ant-design/icons/LockFilled'
import UserOutlined from '@ant-design/icons/UserOutlined'
import Text from '@nexys/components/Typography/Text'
import FInput from '@nexys/fields/FInput/FInput'
import FInputPassword from '@nexys/fields/FInputPassword/FInputPassword'
import { Button, Col, notification, Row, Space } from 'antd'
import cx from 'classnames'
import useProfile from 'data/useProfile'
import { Form, Formik } from 'formik'
import _ from 'lodash'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react'
import { useMutation } from 'react-query'
import ApiCall from 'services/ApiCall'
import loginSchema from 'validations/auth/loginSchema'
import cssLogin from 'views/Auth/Login.module.scss'

export interface LoginEntity {
  email: string
  password: string
}

const brand = process.env.BRAND ?? 'Your Brand'
const LOCAL_STORAGE_SESSION =
  process.env.LOCAL_STORAGE_SESSION ?? 'your_access_token'

function Login() {
  const postLogin = useMutation((data: LoginEntity) => ApiCall.login(data))

  // check kalo udah login
  const queryProfile = useProfile()
  const { isSuccess, data: dataProfile } = queryProfile

  if (isSuccess && !_.isEmpty(dataProfile)) {
    Router.push('/admin/dashboard')
  }

  return (
    <Row
      className={cx(cssLogin.container)}
      align="middle"
      justify="center"
      gutter={[0, 16]}
    >
      <Col xs={24} sm={12} md={12} lg={10}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema.validation}
          onSubmit={async (values, { setSubmitting }) => {
            const { email, password } = values

            try {
              const response = await postLogin.mutateAsync({ email, password })
              const message = _.get(response, 'data.message', '')
              notification.success({ message })

              // get access token
              const accessToken = _.get(response, 'data.accessToken', {})
              localStorage.setItem(LOCAL_STORAGE_SESSION, accessToken)

              // Redirect
              Router.push('/admin/dashboard')
            } catch (error) {
              const description = error?.response?.data?.message
              notification.error({ message: 'Error', description })
            } finally {
              setSubmitting(false)
            }
          }}
        >
          {({ handleSubmit }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <Row gutter={[12, 12]} align="middle" justify="center">
                  <Col xs={16}>
                    <Row justify="center" gutter={[0, 14]}>
                      <Col style={{ marginBottom: '10px' }}>
                        <Space direction="vertical" align="center">
                          <Image
                            layout="fixed"
                            width={150}
                            height={150}
                            src="/static/images/nextjs-logo.png"
                            alt={brand}
                          />
                          <Text size={14}>
                            {`Log in to your ${brand} Account`}
                          </Text>
                        </Space>
                      </Col>

                      <Col xs={24}>
                        <FInput
                          title="Email"
                          name="email"
                          type="email"
                          placeholder="input email"
                          size="large"
                          prefix={<UserOutlined color="primary" />}
                        />
                      </Col>

                      <Col xs={24}>
                        <FInputPassword
                          title="Password"
                          name="password"
                          type="password"
                          placeholder="input password"
                          size="large"
                          prefix={<LockOutlined />}
                        />
                      </Col>

                      <Col xs={24}>
                        <Button
                          type="primary"
                          size="large"
                          block
                          htmlType="submit"
                        >
                          Log In
                        </Button>
                      </Col>

                      <Col>
                        <Space
                          direction="vertical"
                          align="center"
                          style={{ width: '100%' }}
                        >
                          <Link href="/">
                            <a>Forgot password ?</a>
                          </Link>
                        </Space>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            )
          }}
        </Formik>
      </Col>
    </Row>
  )
}

export default Login
