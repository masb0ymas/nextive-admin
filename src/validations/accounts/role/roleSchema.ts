import * as yup from 'yup'

const createOrUpdate = yup.object().shape({
  name: yup.string().required('name is required'),
})

const roleSchema = { createOrUpdate }

export default roleSchema
