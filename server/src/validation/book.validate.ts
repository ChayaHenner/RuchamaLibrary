import * as yup from 'yup';
import { LevelCategory } from '../entities/BookInstance';

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
