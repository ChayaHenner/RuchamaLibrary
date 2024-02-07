import * as yup from 'yup'

import { LevelCategory } from '../entities/BookInstance'

export const bookInstanceSchema = yup.object({
  name: yup.string().required(), //changed to name
  category: yup.string().oneOf(Object.values(LevelCategory)).required(),
  author: yup.string().required(),
  publisher: yup.number().required(),
  price: yup
    .number()
    .required()
    .integer()
    .moreThan(0, 'Price must be a positive integer'),
})
