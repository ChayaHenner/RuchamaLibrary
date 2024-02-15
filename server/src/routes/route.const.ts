import express from 'express'
import booksRouter from './book.route'
import readersRouter from './readers.route'
import borrowingRouter from './borrowing.route'
import publisherRouter from './publisher.route'
import booksInstanceRoute from './bookInstance.route'
import gameRouter from './game.route'
const router = express.Router()

router.use('/game', gameRouter)
router.use('/books', booksRouter)
router.use('/readers', readersRouter)
router.use('/borrowing', borrowingRouter)
router.use('/publishers', publisherRouter)
router.use('/booksinstance', booksInstanceRoute)

export default router
