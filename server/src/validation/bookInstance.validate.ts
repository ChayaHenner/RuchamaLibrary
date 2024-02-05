import * as yup from 'yup';

import { LevelCategory } from '../entities/BookInstance';

export const bookInstanceSchema = yup.object({
    book_name: yup.string().required(),
    category: yup.string().oneOf(Object.values(LevelCategory)).required(),
    author: yup.string().required(),
    publisher_id: yup.number().required(),
    price: yup.number().required().integer().moreThan(0, 'Price must be a positive integer'),
});