import express, { Request, Response, NextFunction } from 'express'
import errorHandler, { validate } from '../utils/middleware'
import {
  postNewBooks,
  getBooks,
  postBooks,
  getBook,
} from '../service/book.service'
import { bookSchema, newBookSchema } from '../validation/book.validate'

const gameRouter = express.Router()

function initializeArray(): number[] {
  const arrayLength = 6
  let numbers: number[]
  do {
    numbers = Array.from({ length: arrayLength }, (_, index) => index)
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[numbers[i], numbers[j]] = [numbers[j], numbers[i]]
    }
  } while (
    numbers.some(
      (num, index) =>
        index < arrayLength - 1 && Math.abs(num - numbers[index + 1]) === 1,
    )
  )
  return numbers
}

gameRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const starLocations = initializeArray()
  const num = 6
  const matrix: number[][] = Array.from({ length: num }, () =>
    Array.from({ length: num }, () => 0),
  )
  starLocations.forEach((starLocation, index) => {
    matrix[index][starLocation] = starLocation + 1
  })
  res.json({ matrix, starLocations })
})
gameRouter.post(
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
gameRouter.post(
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

gameRouter.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookLocation = await getBook(parseInt(req.params.id))
      res.json(bookLocation)
    } catch (err) {
      next(err)
    }
  },
)

gameRouter.use(errorHandler)

export default gameRouter
