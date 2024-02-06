import * as yup from 'yup';

import { LevelCategory } from '../entities/BookInstance';

export const borrowingSchema = yup.object({
    id: yup.number().required(),
    reader: yup.number().required(), 
});
export const borrowingManySchema = yup.object({
    ids: yup.array().of(yup.number().required()).required(),
    reader: yup.number().required(),
  });
export const returnManySchema = yup.object({
   borrow_ids: yup.array().of(yup.number().required()).required(), 
  });
export const returnSchema = yup.object({
    id: yup.number().required()
  });
  