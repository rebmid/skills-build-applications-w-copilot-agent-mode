import { Router } from 'express';
import { LeaderboardModel } from '../models/Leaderboard';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const leaderboard = await LeaderboardModel.find()
      .populate('user', 'username fullName gradeLevel')
      .sort({ rank: 1 });
    res.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

export default router;
