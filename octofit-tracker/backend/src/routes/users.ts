import { Router } from 'express';
import { UserModel } from '../models/User';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const users = await UserModel.find().sort({ points: -1, fullName: 1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

export default router;
