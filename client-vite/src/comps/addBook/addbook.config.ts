import * as yup from 'yup'
import { ObjectSchema, number, object, string } from 'yup'
import { BookFormProps } from '../../utils/types'
export enum CategoryLevels {
  Children = 'Children',
  Teens = 'Teens',
  Adults = 'Adults',
  Academic = 'Academic',
}
export const bookFormSchema: ObjectSchema<BookFormProps> = object({
  name: string()
    .required('Book name is required')
    .min(1, 'Book name must be at least 1 character long')
    .max(50, 'Book name must be at most 50 characters long'),
  author: string()
    .required('Author is required')
    .min(1, 'Author name must be at least 1 character long')
    .max(50, 'Author name must be at most 50 characters long'),
  publisher: number().required('Publisher is required'),
  amount: number()
    .transform((value, originalValue) => (originalValue === '' ? 0 : value))
    .required('Amount is required')
    .max(20, 'You can only add up to 20 books')
    .positive('Amount must be a positive number'),
  category: string()
    .required('Category is required')
    .min(1, 'Category must be at least 1 character long')
    .max(50, 'Category must be at most 50 characters long'),
  price: number()
    .required('Price is required')
    .typeError('Price must be a number')
    .min(0, 'Price must be a positive number')
    .max(500, 'Price must be less that 500')
    .moreThan(0, 'Price must be greater than 0'),
  // .lessThan(Number.MAX_SAFE_INTEGER, 'Price must be less than the maximum safe integer value'),
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
