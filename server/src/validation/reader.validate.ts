import * as yup from 'yup'

export const readerSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  dob: yup
    .date()
    .required()
    .min(new Date(1900, 0, 1), 'too old to take book')
    .max(new Date(2018, 0, 1), 'too young to take book'),
})
