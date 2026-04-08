import express from 'express';
import {
  todoListGetByUser,
  todoGet,
  todoPost,
  todoPut,
  todoDelete,
} from '../controllers/todoController';

import { authenticate } from '../../middlewares';

const router = express.Router();

router
  .route('/')
  .get(authenticate, todoListGetByUser)
  .post(authenticate, todoPost);

router
  .route('/:id')
  .get(todoGet)
  .put(authenticate, todoPut)
  .delete(authenticate, todoDelete);

export default router;
