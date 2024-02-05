import express, { Request, Response } from 'express';
import booksRouter from './booksRoute'
import readersRouter from './readersRoute'
import borrowingRouter from './borrowingRoute'
import publisherRouter from './publisherRoute'
import booksInstanceRoute from './bookInstanceRoute'
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