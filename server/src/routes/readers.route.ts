import express, { Request, Response, NextFunction } from 'express';
import errorHandler, { validate } from '../utils/middleware'
import { getReaders, postReader, softDelete } from '../service/reader.service';
import { readerSchema } from '../validation/reader.validate';
const readerRouter = express.Router();
readerRouter.use(express.json());

readerRouter.get('/', (req: Request, res: Response) => {
  res.send('reader');
});


readerRouter.get('/all', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const searchTerm = req.query.search as string;
    const data = await getReaders(searchTerm)
    res.json(data)
  } catch (err) {
    next(err);
  }
});


readerRouter.post('/', validate(readerSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newReader = await postReader(req.body)
    res.status(201).json(newReader)

  } catch (error) {

    next(error);
  }

});

readerRouter.patch('/:id/soft-delete', async (req: Request, res: Response, next: NextFunction) => {

  try {
    const readerDelete = await softDelete(parseInt(req.params.id))
    res.status(200).json({ message: 'Soft delete successful', reader: readerDelete });

  } catch (err) {
    next(err)
  }

});

readerRouter.use(errorHandler);

export default readerRouter;