import { Schema, model, Document } from 'mongoose';
var bcrypt = require('bcryptjs');


export interface User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  otp?: string;
}

export interface UserDocument extends User, Document {}

const userSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  otp: { type: String, required: false },
});

userSchema.pre('save', async function (next) {
  const user = this as UserDocument;
  if (!user.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
    next();
  }
});

export const UserModel = model<UserDocument>('User', userSchema);
