import express, { Request, Response, NextFunction } from 'express';
import { Publisher } from '../entities/Publisher'
import { z, ZodError } from 'zod';
import errorHandler from '../utils/middleware'
import * as Validation from '../validation/publisher.validate';
import { softDelete,getPublishers ,postPublisher} from '../service/publisher.service';

const publisherRouter = express.Router();

publisherRouter.get('/', (req: Request, res: Response) => {
  res.send('publisher');
});

publisherRouter.get('/all', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getPublishers()
    res.json(data)
  } catch (err) {
    next(err);
  }});


publisherRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {

    const validatedData = await Validation.publisherSchema.validate(req.body, { abortEarly: false, });
    const newReader = await postPublisher(validatedData)
    res.status(201).json(newReader)

  } catch (error) {

    next(error);
  }
});


publisherRouter.patch('/:id/soft-delete', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const publisherDelete = await softDelete(parseInt(req.params.id))
    res.status(200).json({ message: 'Soft delete successful', reader: publisherDelete });

  } catch (err) {
    next(err)
  }

});

publisherRouter.use(errorHandler);

export default publisherRouter;