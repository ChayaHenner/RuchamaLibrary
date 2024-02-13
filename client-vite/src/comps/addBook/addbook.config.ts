import { ObjectSchema, string, object, date, number } from 'yup'
import { BookFormProps } from '../../utils/types' 
import * as yup from 'yup'
export enum CategoryLevels {
  Children = 'Children',
  Teens = 'Teens',
  Adults = 'Adults',
  Academic = 'Academic',
}
export const bookFormSchema: ObjectSchema<BookFormProps> = object({
  name: string().required('Book name is required'),
  author: string().required('Author is required'),
  publisher: number().required('Publisher is required'),
  amount: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? 0 : value))
    .required('Amount is required')
    .max(20, 'You can only add up to 20 books')
    .positive('Amount must be a positive number'),
  category: string().required('Category is required'),
  price: number()
    .required('Price is required')
    .typeError('Price must be a number')
    .min(0, 'Price must be a positive number'),
})



export const existingBookSchema = yup.object().shape({
  amount: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? 0 : value))
    .required('Amount is required')
    .max(20, 'You can only add up to 20 books')
    .positive('Amount must be a positive number'),
  bookCode: number().required('Book is required'),
})