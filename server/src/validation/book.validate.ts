import * as yup from 'yup'
import { LevelCategory } from '../enum/bookInstance.enum'

export const bookSchema = yup.object({
  bookCode: yup.number().required(),
  amount: yup.number().required(),
})
export const newBookSchema = yup.object({
  name: yup.string().required(),
  author: yup.string().required(),
  publisher: yup.string().required(),
  amount: yup.number().required(),
  category: yup.string().oneOf(Object.values(LevelCategory)).required(),
  price: yup.number().required(),
})
