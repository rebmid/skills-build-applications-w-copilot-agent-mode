import { Router } from 'express';
import { ActivityModel } from '../models/Activity';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const activities = await ActivityModel.find()
      .populate('user', 'username fullName')
      .sort({ completedOn: -1 });
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const activity = await ActivityModel.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    next(error);
  }
});

export default router;
