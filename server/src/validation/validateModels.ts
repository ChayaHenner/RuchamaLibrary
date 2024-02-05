
import * as yup from 'yup';
import { LevelCategory } from '../models/BookInstance';
export const readerSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  dob: yup.date().required().min(new Date(1900, 0, 1),'too old to take book').max(new Date(2018, 0, 1),'too young to take book'),
});
export const publisherSchema = yup.object({
    publisher_name: yup.string().required(),
    country: yup.string().required()
});
export const bookSchema = yup.object({
    book_code: yup.string().required(),
    amount: yup.number().required()
});
export const newBookSchema = yup.object({
    book_name: yup.string().required(),
    author: yup.string().required(),
    publisher_id: yup.string().required(),
    amount: yup.number().required(),
    category: yup.string().oneOf(Object.values(LevelCategory)).required(),
    price: yup.number().required()
});
export const bookInstanceSchema = yup.object({
    book_name: yup.string().required(),
    category: yup.string().oneOf(Object.values(LevelCategory)).required(),
    author: yup.string().required(),
    publisher_id: yup.number().required(),
    price: yup.number().required().integer().moreThan(0, 'Price must be a positive integer'),
});
export const borrowingSchema = yup.object({
    book_id: yup.number().required(),
    reader_id: yup.number().required(), 
});
export const borrowingManySchema = yup.object({
    book_ids: yup.array().of(yup.number().required()).required(),
    reader_id: yup.number().required(),
  });
export const returnManySchema = yup.object({
   borrow_ids: yup.array().of(yup.number().required()).required(), 
  });
export const returnSchema = yup.object({
    id: yup.number().required()
  });
  