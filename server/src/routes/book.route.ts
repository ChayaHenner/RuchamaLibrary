import express, { Request, Response, NextFunction } from 'express';
import errorHandler from '../utils/middleware'
import { postNewBooks, getBooks, postBooks, softDelete, getBooksInLibrary } from '../service/book.service';
import { validateBook, validateNewBook } from '../validation/book.validate';
const booksRouter = express.Router();

booksRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getBooks()
    res.json(data)
  } catch (err) {
    next(err);
  }
});
booksRouter.get('/inlibrary', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getBooksInLibrary()
    res.json(data)
  } catch (err) {
    next(err);
  }
});




booksRouter.post('/', validateBook, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await postBooks(req.body)
    res.status(201).json(books);
  }
  catch (err) {
    next(err)
  }

});
booksRouter.post('/newbook',validateNewBook, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await postNewBooks(req.body)
    res.status(201).json(books);
  }
  catch (err) {
    next(err)
  }

});
booksRouter.patch('/:id/soft-delete', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const publisherDelete = await softDelete(parseInt(req.params.id))
    res.status(200).json({ message: 'Soft delete successful', reader: publisherDelete });

  } catch (err) {
    next(err)
  }

});


booksRouter.use(errorHandler);

export default booksRouter;