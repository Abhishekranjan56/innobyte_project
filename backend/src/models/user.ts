import { Schema, model, Document } from 'mongoose';

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  otp?: string;
  
}

const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  otp: { type: String, required: false },
});

export const UserModel = model<User>('User', userSchema);
