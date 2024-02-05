import * as yup from 'yup';

import { LevelCategory } from '../entities/BookInstance';

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
  