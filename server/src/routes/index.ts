import express, { Request, Response } from 'express';
import booksRouter from './book.route'
import readersRouter from './readers.route'
import borrowingRouter from './borrowing.route'
import publisherRouter from './publisher.route'
import booksInstanceRoute from './bookInstance.route'
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Welcome to ruchama library');
});
router.use('/books',booksRouter)
router.use('/readers',readersRouter)
router.use('/borrowing',borrowingRouter)
router.use('/publishers',publisherRouter)
router.use('/booksinstance',booksInstanceRoute)

export default router;