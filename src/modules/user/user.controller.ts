import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { User } from "./user.interface";
import { UserService } from "./user.service";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: "getMe" })
  async getMe(userId: string): Promise<User> {
    return await this.userService.getMe(userId);
  }

  @MessagePattern({ cmd: "getUsers" })
  async getUsers(userIds: string[]): Promise<User[]> {
    return this.userService.getUsers(userIds);
  }

  @MessagePattern({ cmd: "getUserProfile" })
  async getUserProfile(userId: string): Promise<User> {
    return this.userService.getUserProfile(userId);
  }

  @MessagePattern({ cmd: "updateUser" })
  async updateUser(userId: string, name: string, email: string): Promise<User> {
    return this.userService.updateUser(userId, name, email);
  }
}
