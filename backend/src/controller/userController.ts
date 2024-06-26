import { Body, Controller, Get, Path, Post, Put, Route, SuccessResponse } from "tsoa";
import { User } from "../models/user";
import { UserService, UserCreationParams } from "../services/userService";
import { sendOtp, verifyOtp } from "../services/otpService";

@Route("users")
export class UserController extends Controller {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  @Get("{userId}")
  public async getUser(@Path() userId: string): Promise<User | null> {
    return this.userService.getUser(userId);
  }

  @SuccessResponse("201", "Created")
  @Post()
  public async createUser(@Body() body: UserCreationParams): Promise<User> {
    const user = await this.userService.createUser(body);
    const otp = await sendOtp(user.email);
    this.setStatus(201);
    return user;
  }

  @Put("{userId}")
  public async updateUser(
    @Path() userId: string,
    @Body() body: Partial<User>
  ): Promise<User | null> {
    return this.userService.updateUser(userId, body);
  }

  @Post("otp")
  public async verifyOtp(
    @Body() body: { email: string; otp: string }
  ): Promise<{ message: string }> {
    const isValidOtp = await verifyOtp(body.email, body.otp);
    if (!isValidOtp) throw new Error("Invalid OTP");

    return { message: "OTP verified successfully" };
  }
}
