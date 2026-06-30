import { Schema, model, type InferSchemaType } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    intensity: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    focus: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

export type Workout = InferSchemaType<typeof workoutSchema>;
export const WorkoutModel = model('Workout', workoutSchema);
