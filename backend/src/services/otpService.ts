import { v4 as uuidv4 } from 'uuid';
import { UserService } from "./userService";

const userService = new UserService();

export async function sendOtp(email: string): Promise<void> {
  const otp = uuidv4().split('-')[0];
  await userService.updateUserByEmail(email, { otp });
}

export async function verifyOtp(email: string, otp: string): Promise<boolean> {
  const user = await userService.findByEmail(email);
  return user ? user.otp === otp : false;
}
