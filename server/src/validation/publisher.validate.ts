import * as yup from 'yup'
export const publisherSchema = yup.object({
  name: yup.string().required(),
  country: yup.string().required(),
})
