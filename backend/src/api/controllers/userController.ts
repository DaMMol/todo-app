import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/userModel';
import { UserInput, UserOutput } from '../../interfaces/User';
import { MessageResponse } from '../../interfaces/MessageInterfaces';
import CustomError from '../../utils/CustomError';

async function userListGet(
  req: Request,
  res: Response<UserOutput[]>,
  next: NextFunction,
) {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

async function userGet(
  req: Request<{ id: string }>,
  res: Response<UserOutput>,
  next: NextFunction,
) {
  try {
    const user = await UserModel.findById(req.params.id);

    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function userPost(
  req: Request<{}, {}, UserInput>,
  res: Response<MessageResponse & { user: UserOutput }>,
  next: NextFunction,
) {
  try {
    const user = await UserModel.create(req.body);
    res.status(200).json({
      message: 'User created',
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    next(error);
  }
}

async function userPut(
  req: Request,
  res: Response<MessageResponse & { user: UserOutput }>,
  next: NextFunction,
) {
  try {
    const user = await UserModel.update(res.locals.user.id, req.body);
    if (!user) {
      next(new CustomError('User not found', 404));
    }
    res.json({
      message: 'User updated',
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    next(error);
  }
}

async function userDelete(
  req: Request,
  res: Response<MessageResponse & { user: UserOutput }>,
  next: NextFunction,
) {
  try {
    if (!res.locals.user) {
      next(new CustomError('User not found', 404));
    }

    const id = String(res.locals.user.id);
    const user = await UserModel.delete(id);
    res.json({
      message: 'User deleted',
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    next(error);
  }
}

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  if (!res.locals.user) {
    next(new CustomError('No valid user', 404));
  } else {
    res.json({
      message: 'Valid user',
      user: {
        id: res.locals.user.id,
        username: res.locals.user.username,
      },
    });
  }
};

export { userListGet, userGet, userPost, userPut, userDelete, checkToken };
