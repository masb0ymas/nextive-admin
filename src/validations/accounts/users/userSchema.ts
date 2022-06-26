import * as yup from 'yup'

const baseValidation = yup.object().shape({
  fullName: yup.string().required('fullname is required'),
  RoleId: yup.string().required('role is required'),
  picturePath: yup.string().nullable(),
  isActive: yup.boolean().nullable(),
})

const create = yup.object().shape({
  ...baseValidation.fields,
  email: yup.string().email('invalid email').required('email is required'),
  phone: yup.string().required('phone is required'),
  newPassword: yup
    .string()
    .min(8, 'at least 8 characters')
    .oneOf([yup.ref('confirmNewPassword')], 'passwords are not the same')
    .required('new password is required'),
  confirmNewPassword: yup
    .string()
    .min(8, 'at least 8 characters')
    .oneOf([yup.ref('newPassword')], 'passwords are not the same')
    .required('confirm new password is required'),
})

const update = yup.object().shape({
  ...baseValidation.fields,
  email: yup.string().nullable(),
  phone: yup.string().nullable(),
  newPassword: yup.string().nullable(),
  confirmNewPassword: yup.string().nullable(),
})

const userSchema = { create, update }

export default userSchema
