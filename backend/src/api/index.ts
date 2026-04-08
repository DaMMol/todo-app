import express from 'express';

import userRoute from './routes/userRoute';
import authRoute from './routes/authRoute';
import todoRoute from './routes/todoRoute';
import { MessageResponse } from '../interfaces/MessageInterfaces';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'routes: auth, user, todos',
  });
});

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/todos', todoRoute);

export default router;
