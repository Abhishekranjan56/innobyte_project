import { UserService } from "./userService";
import { sendConfirmationEmail } from "./emailService";

const userService = new UserService();

// Function to generate a 6-digit numeric OTP
function generateNumericOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOtp(email: string): Promise<string> {
  const otp = generateNumericOtp();
  await userService.updateUserByEmail(email, { otp });
  sendConfirmationEmail(email, otp); 
  return otp;
}

export async function verifyOtp(email: string, otp: string): Promise<boolean> {
  const user = await userService.findByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  return user.otp === otp;
}
