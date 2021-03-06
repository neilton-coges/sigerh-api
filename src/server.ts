import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import { AppError } from './error/AppError';
import { routes } from './routes';
import './config/database';
import './container';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errors());
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => { // eslint-disable-line
    if (err instanceof AppError) {
      return response.status(err.code).json({
        message: err.message,
      });
    }

    console.log(err);

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  },
);

app.listen(3333, () => console.log('🚀 Server is running on port 3333'));
