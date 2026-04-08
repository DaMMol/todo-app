import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import CustomError from '../../utils/CustomError';
import { UserOutput } from '../../interfaces/User';
import { LoginResponse } from '../../interfaces/MessageInterfaces';
import bcrypt from 'bcrypt';
import { db } from '../../utils/db';

const login = async (
  req: Request<{}, {}, { username: string; password: string }>,
  res: Response<LoginResponse>,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new CustomError('username and password are required', 400);
    }
    const user = await db('users').where({ username: username }).first();
    if (!user) {
      throw new CustomError('User or password is incorrect', 403);
    }
    if (user.password && !bcrypt.compareSync(password, user.password)) {
      throw new CustomError('User or password is incorrect', 403);
    }

    if (!process.env.JWT_SECRET) {
      next(new CustomError('JWT secret not set', 500));
      return;
    }

    const outUser: UserOutput = {
      id: user.id,
      username: user.username,
    };

    const token = jwt.sign(outUser, process.env.JWT_SECRET);

    const login: LoginResponse = {
      token,
      user: outUser,
    };
    res.json(login);
  } catch (error) {
    next(error);
  }
};

export { login };
