import mongoose from 'mongoose';
import { ActivityModel } from '../models/Activity';
import { LeaderboardModel } from '../models/Leaderboard';
import { TeamModel } from '../models/Team';
import { UserModel } from '../models/User';
import { WorkoutModel } from '../models/Workout';

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(mongoUri);

  await Promise.all([
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    TeamModel.deleteMany({}),
    UserModel.deleteMany({}),
    WorkoutModel.deleteMany({})
  ]);

  const users = await UserModel.insertMany([
    { username: 'maya10', fullName: 'Maya Chen', gradeLevel: 10, points: 420 },
    { username: 'jordan11', fullName: 'Jordan Rivera', gradeLevel: 11, points: 385 },
    { username: 'sam9', fullName: 'Sam Patel', gradeLevel: 9, points: 310 },
    { username: 'taylor12', fullName: 'Taylor Brooks', gradeLevel: 12, points: 455 },
    { username: 'avery10', fullName: 'Avery Johnson', gradeLevel: 10, points: 275 }
  ]);

  const userByUsername = new Map(users.map((user) => [user.username, user]));

  const requiredUser = (username: string) => {
    const user = userByUsername.get(username);
    if (!user) {
      throw new Error(`Missing seeded user: ${username}`);
    }
    return user;
  };

  await TeamModel.insertMany([
    {
      name: 'Cardio Captains',
      coach: 'Paul Octo',
      members: [requiredUser('maya10')._id, requiredUser('jordan11')._id, requiredUser('avery10')._id]
    },
    {
      name: 'Strength Squad',
      coach: 'Jessica Cat',
      members: [requiredUser('sam9')._id, requiredUser('taylor12')._id]
    }
  ]);

  await ActivityModel.insertMany([
    {
      user: requiredUser('maya10')._id,
      category: 'running',
      durationMinutes: 35,
      pointsEarned: 70,
      completedOn: new Date('2026-06-24T15:30:00Z')
    },
    {
      user: requiredUser('jordan11')._id,
      category: 'cycling',
      durationMinutes: 45,
      pointsEarned: 80,
      completedOn: new Date('2026-06-25T16:15:00Z')
    },
    {
      user: requiredUser('sam9')._id,
      category: 'walking',
      durationMinutes: 30,
      pointsEarned: 40,
      completedOn: new Date('2026-06-26T14:45:00Z')
    },
    {
      user: requiredUser('taylor12')._id,
      category: 'strength',
      durationMinutes: 50,
      pointsEarned: 95,
      completedOn: new Date('2026-06-27T17:00:00Z')
    },
    {
      user: requiredUser('avery10')._id,
      category: 'sports',
      durationMinutes: 60,
      pointsEarned: 90,
      completedOn: new Date('2026-06-28T18:20:00Z')
    }
  ]);

  const rankedUsers = [...users].sort((firstUser, secondUser) => secondUser.points - firstUser.points);

  await LeaderboardModel.insertMany(
    rankedUsers.map((user, index) => ({
      user: user._id,
      totalPoints: user.points,
      rank: index + 1
    }))
  );

  await WorkoutModel.insertMany([
    {
      title: 'Freshman 20-Minute Starter Circuit',
      intensity: 'beginner',
      durationMinutes: 20,
      focus: 'Full-body confidence and movement basics'
    },
    {
      title: 'After-School 5K Builder',
      intensity: 'intermediate',
      durationMinutes: 35,
      focus: 'Running endurance and pacing'
    },
    {
      title: 'Varsity Strength Ladder',
      intensity: 'advanced',
      durationMinutes: 45,
      focus: 'Strength training and conditioning'
    },
    {
      title: 'Low-Impact Recovery Flow',
      intensity: 'beginner',
      durationMinutes: 25,
      focus: 'Mobility and active recovery'
    }
  ]);

  console.log('Seed complete:', {
    users: await UserModel.countDocuments(),
    teams: await TeamModel.countDocuments(),
    activities: await ActivityModel.countDocuments(),
    leaderboard: await LeaderboardModel.countDocuments(),
    workouts: await WorkoutModel.countDocuments()
  });
}

seedDatabase()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
