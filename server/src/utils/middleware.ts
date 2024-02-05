import express, { Request, Response, NextFunction } from 'express';
import { bookSchema, newBookSchema } from '../validation/book.validate';
import { bookInstanceSchema } from '../validation/bookInstance.validate';
import { borrowingManySchema, borrowingSchema, returnManySchema, returnSchema } from '../validation/borrowing.validate.ts';
import { publisherSchema } from '../validation/publisher.validate';
import { readerSchema } from '../validation/reader.validate';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error caught by middleware:', err);
  
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        error: 'ValidationError',
        info: err
      });
    }
  
    res.status(500).json({
      error: 'Internal Server Error',
      info: err
    });
  
  };
  
  export default errorHandler;

  export const validate = (schemaName: string) => async (req: Request, res: Response, next: NextFunction) => {
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
        case 'bookInstance':
            return bookInstanceSchema;
        case 'borrowingSchema':
            return borrowingSchema;
        case 'borrowingManySchema':
            return borrowingManySchema;
        case 'returnSchema':
            return returnSchema;
        case 'returnManySchema':
            return returnManySchema;
        case 'publisherSchema':
            return publisherSchema;
        case 'readerSchema':
            return readerSchema;
        default:
            throw new Error(`Schema '${schemaName}' not found`);
    }
};
