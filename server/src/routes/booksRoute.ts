import express, { Request, Response, NextFunction } from 'express';
import errorHandler from '../utils/middleware'
import {postNewBooks, getBooks, postBooks ,softDelete ,getBooksInLibrary } from '../service/book.service';
import * as Validation from '../validation/validateModels';

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

booksRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = await Validation.bookSchema.validate(req.body, { abortEarly: false, });
    const books = await postBooks(req.body)
  
    res.status(201).json(books);
  }
  catch (err) {
    next(err)
  }

});
booksRouter.post('/newbook', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = await Validation.newBookSchema.validate(req.body, { abortEarly: false, });
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