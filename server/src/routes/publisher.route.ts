import express, { Request, Response, NextFunction } from 'express';
import errorHandler, { validate } from '../utils/middleware'
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


publisherRouter.post('/',validate('publisherSchema'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newReader = await postPublisher(req.body)
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