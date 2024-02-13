import express, { Request, Response, NextFunction } from 'express'
import errorHandler, { validate } from '../utils/middleware'
import {
  getBookInstancesLibrary,
  getBookInstances,
  postBooksInstance,
  softDeleteInstance,
} from '../service/bookinstance.sevice'
import { bookInstanceSchema } from '../validation/bookInstance.validate'

const booksInstanceRouter = express.Router()

booksInstanceRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getBookInstances()
      res.json(data)
    } catch (err) {
      next(err)
    }
  },
)

booksInstanceRouter.get(
  '/library',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getBookInstancesLibrary()
      res.json(data)
    } catch (err) {
      next(err)
    }
  },
)

booksInstanceRouter.patch(
  '/:id/soft-delete',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await softDeleteInstance(parseInt(req.params.id))
      res.json(data)

      // res
      // .status(200)
      // .json({ message: 'Soft delete successful', reader: readerDelete })
    } catch (err) {
      next(err)
    }
  },
)
// booksInstanceRouter.post(
//   '/',
//   validate(bookInstanceSchema),
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const newBookInstance = await postBooksInstance(req.body)
//       res.status(201).json(newBookInstance)
//     } catch (err) {
//       next(err)
//     }
//   },
// )

booksInstanceRouter.use(errorHandler)

export default booksInstanceRouter
