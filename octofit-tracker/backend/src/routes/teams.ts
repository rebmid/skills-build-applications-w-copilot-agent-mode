import { Router } from 'express';
import { TeamModel } from '../models/Team';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const teams = await TeamModel.find().populate('members', 'username fullName points').sort({ name: 1 });
    res.json(teams);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const team = await TeamModel.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    next(error);
  }
});

export default router;
