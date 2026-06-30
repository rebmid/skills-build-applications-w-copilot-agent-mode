import { Schema, model, type InferSchemaType, Types } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: {
      type: String,
      enum: ['running', 'walking', 'strength', 'cycling', 'sports'],
      required: true
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    pointsEarned: { type: Number, required: true, min: 0 },
    completedOn: { type: Date, required: true }
  },
  { timestamps: true }
);

export type Activity = Omit<InferSchemaType<typeof activitySchema>, 'user'> & {
  user: Types.ObjectId;
};

export const ActivityModel = model('Activity', activitySchema);
