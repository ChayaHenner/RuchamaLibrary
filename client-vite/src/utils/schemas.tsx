import { ObjectSchema, string, object, date ,number } from 'yup';
import { ReaderForm ,BookFormProps} from './types';
import * as yup from 'yup';

export const formSchema: ObjectSchema<ReaderForm> = object({
    name: string().required('Name is required'),
    email: string().email('Enter a valid email').required('Email is required'),
    dob: date().required('Date of Birth is required'),
});

export const bookFormSchema: ObjectSchema<BookFormProps> = object({

    book_name: string().required('Book name is required'),
    author: string().required('Author is required'),
    publisher_id: number().required('Publisher is required'),
    amount: number().required('Amount is required').min(1, 'Amount must be at least 1'),
    category: string().required('Category is required'),
    price: number().required('Price is required')
    .typeError('Price must be a number')
    .min(0, 'Price must be a positive number')
  });

  export const existingBookSchema = yup.object().shape({
    amount: yup.number()
        .transform((value, originalValue) => originalValue === '' ? 0 : value)
        .required('Amount is required').max(20,'You can only add up to 20 books')
        .positive('Amount must be a positive number'),
    book_code: number().required('Book is required')
});

export const publisherSchema = yup.object().shape({
    publisher_name:string().required(),
    country:string().required()
})