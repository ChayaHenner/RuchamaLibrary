import express, { Request, Response, NextFunction } from 'express';
import { BookInstance } from '../entities/BookInstance'
import errorHandler from '../utils/middleware'
import * as Validation from '../validation/bookInstance.validate';
import { getBookInstancesLibrary,getBookInstances ,postBooksInstance } from '../service/bookinstance.sevice';


const booksInstanceRouter = express.Router();

booksInstanceRouter.get('/',async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await getBookInstances()
        res.json(data)
      } catch (err) {
        next(err);
      }
});
booksInstanceRouter.get('/library',async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await getBookInstancesLibrary()
        res.json(data)
      } catch (err) {
        next(err);
      }
});

booksInstanceRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {

    try {
    
        const validatedData = await Validation.bookInstanceSchema.validate(req.body, { abortEarly: false, });
        const newBookInstance = await postBooksInstance (req.body)
        
        res.status(201).json(newBookInstance);
        
    }
    catch (err) {
        next(err)
    }

});

booksInstanceRouter.use(errorHandler);

export default booksInstanceRouter;