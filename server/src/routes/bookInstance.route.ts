import express, { Request, Response, NextFunction } from 'express';
import errorHandler, { validate } from '../utils/middleware'
import { getBookInstancesLibrary, getBookInstances, postBooksInstance } from '../service/bookinstance.sevice';


const booksInstanceRouter = express.Router();

booksInstanceRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getBookInstances()
    res.json(data)
  } catch (err) {
    next(err);
  }
});
booksInstanceRouter.get('/library', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getBookInstancesLibrary()
    res.json(data)
  } catch (err) {
    next(err);
  }
});

booksInstanceRouter.post('/', validate('bookInstance'), async (req: Request, res: Response, next: NextFunction) => {

  try {
    const newBookInstance = await postBooksInstance(req.body)
    res.status(201).json(newBookInstance);

  }
  catch (err) {
    next(err)
  }

});

booksInstanceRouter.use(errorHandler);

export default booksInstanceRouter;