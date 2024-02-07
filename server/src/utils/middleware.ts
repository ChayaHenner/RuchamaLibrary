import * as yup from 'yup'
import express, { Request, Response, NextFunction } from 'express'
import { bookSchema, newBookSchema } from '../validation/book.validate'
// import { bookInstanceSchema } from '../validation/bookInstance.validate';
import {
  borrowingManySchema,
  borrowingSchema,
  returnManySchema,
  returnSchema,
} from '../validation/borrowing.validate.ts'
import { publisherSchema } from '../validation/publisher.validate'
import { readerSchema } from '../validation/reader.validate'

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error('Error caught by middleware:', err)

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'ValidationError',
      info: err,
    })
  }

  res.status(500).json({
    error: 'Internal Server Error',
    info: err,
  })
}

export default errorHandler

export const validate =
  (schema: yup.Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.validate(req.body)
      next()
    } catch (error) {
      next(error)
    }
  }
