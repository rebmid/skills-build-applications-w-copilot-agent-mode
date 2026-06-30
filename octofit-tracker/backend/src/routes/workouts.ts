import { Router } from 'express';
import { WorkoutModel } from '../models/Workout';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const workouts = await WorkoutModel.find().sort({ intensity: 1, title: 1 });
    res.json(workouts);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const workout = await WorkoutModel.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    next(error);
  }
});

export default router;
