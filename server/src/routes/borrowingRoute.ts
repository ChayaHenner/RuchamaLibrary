import express, { Request, Response, NextFunction } from 'express';
import { Borrowing } from '../models/Borrowing'
import { Book } from '../models/Book'
import { Reader } from '../models/Reader'
import errorHandler from '../utils/middleware'
import {getBorrowingByReader,postReturnManyBooks,postBorrowMany,toptenbooks, getBorrowing ,postBorrowBook ,postReturnBook ,twoweekspassed} from '../service/borrowing.service';
import * as Validation from '../validation/validateModels';
import { createQueryBuilder, getConnection } from 'typeorm';

const borrowingRouter = express.Router();

borrowingRouter.get('/',async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getBorrowing()
    res.json(data)
  } catch (err) {
    next(err);
  }});
borrowingRouter.get('/reader/:reader_id',async (req: Request, res: Response, next: NextFunction) => {
  try {const reader_id=req.params.reader_id
 const reader_id_int: number = parseInt(req.params.reader_id);

 console.log(reader_id);
 
 
    const data = await getBorrowingByReader( reader_id_int)
    res.json(data)
  } catch (err) {
    next(err);
  }
});

borrowingRouter.post('/borrow', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = await Validation.borrowingSchema.validate(req.body, { abortEarly: false, });
    const borrow_book = await postBorrowBook(req.body)
    res.status(201).json(borrow_book);
  }
  catch (err) {
    next(err)
  }

});

borrowingRouter.post('/borrowmany', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = await Validation.borrowingManySchema.validate(req.body, { abortEarly: false, });
    const borrow_book = await postBorrowMany(req.body)
    res.status(201).json(borrow_book);
  }
  catch (err) {
    next(err)
  }

});



borrowingRouter.post('/returnbyid', async (req: Request, res: Response, next: NextFunction) => {
  try {//check validation
    const validatedData = await Validation.returnSchema.validate(req.body, { abortEarly: false, });
      const return_book = await postReturnBook(req.body)
       res.status(201).json(return_book);
  }
  catch (err) {
    next(err)
  }

});
borrowingRouter.post('/returnmany', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = await Validation.returnManySchema.validate(req.body, { abortEarly: false, });
      const return_book = await postReturnManyBooks(req.body)
       res.status(201).json(return_book);
  }
  catch (err) {
    next(err)
  }

});

borrowingRouter.get('/topten', async (req: Request, res: Response, next: NextFunction) => {
  try {
      const books = await toptenbooks()
       res.status(201).json(books);
  }
  catch (err) {
    next(err)
  }

});
borrowingRouter.get('/twoweeks', async (req: Request, res: Response, next: NextFunction) => {
  try {
      const books = await twoweekspassed()
       res.status(201).json(books);
  }
  catch (err) {
    next(err)
  }

});

borrowingRouter.use(errorHandler);

export default borrowingRouter;







