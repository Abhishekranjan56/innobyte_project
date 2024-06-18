import { UserModel, User } from "../models/user";

// A post request should not contain an id.
export type UserCreationParams = Pick<User, "email" | "firstName" | "lastName" >;

export class UserService {
  public async getUser(id: string): Promise<User | null> {
    return UserModel.findById(id).exec();
  }

  public async createUser(userCreationParams: UserCreationParams): Promise<User> {
    const newUser = new UserModel({
      ...userCreationParams,
      password: "default_password",
    });
    return newUser.save();
  }

  public async updateUser(id: string, update: Partial<User>): Promise<User | null> {
    return UserModel.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  public async deleteUser(id: string): Promise<User | null> {
    return UserModel.findByIdAndDelete(id).exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email }).exec();
  }

  public async updateUserByEmail(email: string, update: Partial<User>): Promise<User | null> {
    return UserModel.findOneAndUpdate({ email }, update, { new: true }).exec();
  }
}
