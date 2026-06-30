import { Schema, model, type InferSchemaType, Types } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    coach: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }]
  },
  { timestamps: true }
);

export type Team = Omit<InferSchemaType<typeof teamSchema>, 'members'> & {
  members: Types.ObjectId[];
};

export const TeamModel = model('Team', teamSchema);
