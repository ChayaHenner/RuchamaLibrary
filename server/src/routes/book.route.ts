import express, { Request, Response, NextFunction } from 'express'
import errorHandler, { validate } from '../utils/middleware'
import {
  postNewBooks,
  getBooks,
  postBooks,
  softDelete,
  getBooksInLibrary,
  getLocation,
} from '../service/book.service'
import { bookSchema, newBookSchema } from '../validation/book.validate'

const booksRouter = express.Router()

booksRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getBooks()
      res.json(data)
    } catch (err) {
      next(err)
    }
  },
)
booksRouter.get(
  '/inlibrary',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getBooksInLibrary()
      res.json(data)
    } catch (err) {
      next(err)
    }
  },
)

booksRouter.post(
  '/',
  validate(bookSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const books = await postBooks(req.body)
      res.status(201).json(books)
    } catch (err) {
      next(err)
    }
  },
)
booksRouter.post(
  '/newbook',
  validate(newBookSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const books = await postNewBooks(req.body)
      res.json(books)
    } catch (err) {
      next(err)
    }
  },
)
booksRouter.patch(
  '/:id/soft-delete',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookDelete = await softDelete(parseInt(req.params.id))
      res.json(bookDelete)
    } catch (err) {
      next(err)
    }
  },
)
booksRouter.get(
  '/:id/location',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookLocation = await getLocation(parseInt(req.params.id))
      res.json(bookLocation)

    } catch (err) {
      next(err)
    }
  },
)

booksRouter.use(errorHandler)

export default booksRouter
