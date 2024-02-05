import * as yup from 'yup';
import { LevelCategory } from '../entities/BookInstance';
import express, { Request, Response, NextFunction } from 'express';

export const bookSchema = yup.object({
    book_code: yup.number().required(),
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

// export const validateMiddleware = async (schemaName: string,req: Request, res: Response, next: NextFunction) => {
//     try {
        
//       req.body = await bookSchema.validate(req.body);
//   console.log(req.body);
  
//       next();
//     } catch (error) {
//       next(error);
//     }
//   };
export const validateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await bookSchema.validate(req.body);
  console.log(req.body);
  
      next();
    } catch (error) {
      next(error);
    }
  };
export const validateNewBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await newBookSchema.validate(req.body);
  console.log(req.body);
  
      next();
    } catch (error) {
      next(error);
    }
  };

  
  export const validateMiddleware = (schemaName: string) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = getSchema(schemaName);
        req.body = await schema.validate(req.body);
        next();
    } catch (error) {
        next(error);
    }
};

const getSchema = (schemaName: string) => {
    switch (schemaName) {
        case 'bookSchema':
            return bookSchema;
        case 'newBookSchema':
            return newBookSchema;
        default:
            throw new Error(`Schema '${schemaName}' not found`);
    }
};
