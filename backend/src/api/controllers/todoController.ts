import { Request, Response, NextFunction } from 'express';
import { TodoModel } from '../models/todoModel';
import { Todo, TodoInput, TodoUpdateInput } from '../../interfaces/Todo';
import { MessageResponse } from '../../interfaces/MessageInterfaces';
import CustomError from '../../utils/CustomError';

async function todoListGetByUser(
  req: Request,
  res: Response<Todo[]>,
  next: NextFunction,
) {
  try {
    const todos = await TodoModel.findAll(res.locals.user.id);
    res.json(todos);
  } catch (error) {
    next(error);
  }
}

async function todoGet(
  req: Request<{ id: string }>,
  res: Response<Todo>,
  next: NextFunction,
) {
  try {
    const todo = await TodoModel.findById(req.params.id);

    res.json(todo);
  } catch (error) {
    next(error);
  }
}

async function todoPost(
  req: Request<{}, {}, Omit<TodoInput, 'userId'>>,
  res: Response<MessageResponse & { todo: Todo }>,
  next: NextFunction,
) {
  try {
    const todo = await TodoModel.create({
      ...req.body,
      userId: res.locals.user.id,
    });
    res.status(200).json({
      message: 'Todo created',
      todo: todo,
    });
  } catch (error) {
    next(error);
  }
}

async function todoPut(
  req: Request<{ id: string }, {}, TodoUpdateInput>,
  res: Response<MessageResponse & { todo: Todo }>,
  next: NextFunction,
) {
  try {
    const todo = await TodoModel.update(req.params.id, req.body);
    if (!todo) {
      next(new CustomError('Todo not found', 404));
    }
    res.json({
      message: 'Todo updated',
      todo: todo,
    });
  } catch (error) {
    next(error);
  }
}

async function todoDelete(
  req: Request<{ id: string }>,
  res: Response<MessageResponse & { todo: Todo }>,
  next: NextFunction,
) {
  try {
    const todo = await TodoModel.delete(req.params.id);
    if (!todo) {
      next(new CustomError('Todo not found', 404));
    }
    res.json({
      message: 'Todo deleted',
      todo: todo,
    });
  } catch (error) {
    next(error);
  }
}

export { todoListGetByUser, todoGet, todoPost, todoPut, todoDelete };
