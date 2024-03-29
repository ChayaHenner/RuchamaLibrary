import express, { Request, Response, NextFunction } from 'express'
import errorHandler, { validate } from '../utils/middleware'
import {
  softDelete,
  getPublishers,
  postPublisher,
  getReport,
} from '../service/publisher.service'
import { publisherSchema } from '../validation/publisher.validate'

const publisherRouter = express.Router()

// publisherRouter.get('/', (req: Request, res: Response) => {
//   res.send('publisher')
// })

publisherRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getPublishers()
      res.json(data)
    } catch (err) {
      next(err)
    }
  },
)
publisherRouter.get(
  '/report',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getReport()
      res.json(data)
    } catch (err) {
      next(err)
    }
  },
)

publisherRouter.post(
  '/',
  validate(publisherSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newReader = await postPublisher(req.body)
      res.json(newReader)
    } catch (error) {
      next(error)
    }
  },
)

publisherRouter.patch(
  '/:id/soft-delete',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const publisherDelete = await softDelete(parseInt(req.params.id))
      res.json(publisherDelete)
    } catch (err) {
      next(err)
    }
  },
)

publisherRouter.use(errorHandler)

export default publisherRouter
