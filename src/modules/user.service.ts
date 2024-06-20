import { Injectable } from "@nestjs/common";

import { User } from "./user.interface";

@Injectable()
export class UserService {
  constructor() {}

  async getMe(userId: string): Promise<User> {
    return {
      id: userId,
      name: "test",
      email: "test@test.com",
      createdAt: new Date(),
    };
  }

  async getUserProfile(userId: string): Promise<User> {
    return {
      id: userId,
      name: "test",
      email: "test@test.com",
      createdAt: new Date(),
    };
  }

  async updateUser(userId: string, name: string, email: string): Promise<User> {
    return {
      id: userId,
      name: name,
      email: email,
      createdAt: new Date(),
    };
  }
}
