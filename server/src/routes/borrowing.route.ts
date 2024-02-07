import express, { Request, Response, NextFunction } from 'express'
import errorHandler, { validate } from '../utils/middleware'
import {
  getBorrowingByReader,
  postReturnManyBooks,
  postBorrowMany,
  toptenbooks,
  getBorrowing,
  postBorrowBook,
  postReturnBook,
  twoweekspassed,
} from '../service/borrowing.service'
import {
  borrowingManySchema,
  borrowingSchema,
  returnManySchema,
  returnSchema,
} from '../validation/borrowing.validate.ts'

const borrowingRouter = express.Router()

borrowingRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getBorrowing()
      res.json(data)
    } catch (err) {
      next(err)
    }
  },
)

borrowingRouter.get(
  '/reader/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const readerId: number = parseInt(req.params.id)
      const data = await getBorrowingByReader(readerId)
      res.json(data)
    } catch (err) {
      next(err)
    }
  },
)

borrowingRouter.post(
  '/borrow',
  validate(borrowingSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const borrowBook = await postBorrowBook(req.body)
      res.status(201).json(borrowBook)
    } catch (err) {
      next(err)
    }
  },
)

borrowingRouter.post(
  '/borrowmany',
  validate(borrowingManySchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const borrowBooks = await postBorrowMany(req.body)
      res.status(201).json(borrowBooks)
    } catch (err) {
      next(err)
    }
  },
)

borrowingRouter.post(
  '/returnbyid',
  validate(returnSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const returnBook = await postReturnBook(req.body)
      res.status(201).json(returnBook)
    } catch (err) {
      next(err)
    }
  },
)
borrowingRouter.post(
  '/returnmany',
  validate(returnManySchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const returnBooks = await postReturnManyBooks(req.body)
      res.status(201).json(returnBooks)
    } catch (err) {
      next(err)
    }
  },
)

borrowingRouter.get(
  '/topten',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const books = await toptenbooks()
      res.status(201).json(books)
    } catch (err) {
      next(err)
    }
  },
)
borrowingRouter.get(
  '/twoweeks',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const books = await twoweekspassed()
      res.status(201).json(books)
    } catch (err) {
      next(err)
    }
  },
)

borrowingRouter.use(errorHandler)

export default borrowingRouter
