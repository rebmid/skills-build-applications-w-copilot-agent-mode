import { Schema, model, type InferSchemaType, Types } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    totalPoints: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 }
  },
  { timestamps: true }
);

export type LeaderboardEntry = Omit<InferSchemaType<typeof leaderboardSchema>, 'user'> & {
  user: Types.ObjectId;
};

export const LeaderboardModel = model('Leaderboard', leaderboardSchema);
