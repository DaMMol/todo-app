import express from 'express';
import {
  userListGet,
  userGet,
  userPost,
  userPut,
  userDelete,
  checkToken,
} from '../controllers/userController';
import { authenticate } from '../../middlewares';

const router = express.Router();

router
  .route('/')
  .get(userListGet)
  .post(userPost)
  .put(authenticate, userPut)
  .delete(authenticate, userDelete);

router.get('/token', authenticate, checkToken);

router.route('/:id').get(userGet);

export default router;
