/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import CustomError from './utils/CustomError';
import jwt from 'jsonwebtoken';
import { UserOutput } from './interfaces/User';
import { ErrorResponse } from './interfaces/MessageInterfaces';
import { UserModel } from './api/models/userModel';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(`🔍 - Not Found - ${req.originalUrl}`, 404);
  next(error);
};

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction,
) => {
  console.error('errorHandler', err.message);
  res.status(err.status || 500);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bearer = req.headers.authorization;
    if (!bearer) {
      next(new CustomError('No token provided', 401));
      return;
    }

    const token = bearer.split(' ')[1];

    if (!token) {
      next(new CustomError('No token provided', 401));
      return;
    }

    const tokenContent = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as UserOutput;

    const user = await UserModel.findById(tokenContent.id);

    if (!user) {
      next(new CustomError('Token not valid', 403));
      return;
    }

    // add user to req locals to be used in other middlewares / controllers
    res.locals.user = tokenContent;

    next();
  } catch (error) {
    next(new CustomError((error as Error).message, 400));
  }
};

export { notFound, errorHandler, authenticate };
