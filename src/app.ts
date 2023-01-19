import express, {
  json, NextFunction, Request, Response,
} from 'express';
import mongoose from 'mongoose';
import { ErrorCastom, RequestCastom } from './types';
import routes from './routes/index';

const { PORT = 3000 } = process.env;

const app = express();

app.use(json());

mongoose.connect('mongodb://localhost:27017/mestodb ');

app.use((req: RequestCastom, res: Response, next: NextFunction) => {
  req.user = {
    _id: '63c81d9b140f5294b9b9346a',
  };

  next();
});

app.use('/', routes);

app.use((err: ErrorCastom, req: Request, res: Response, next: NextFunction) => {
  if (!err) {
    next();
  }
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
