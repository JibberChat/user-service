import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { User } from "./user.interface";
import { UserService } from "./user.service";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: "getMe" })
  async getMe(data: { userId: string }): Promise<User> {
    return await this.userService.getMe(data.userId);
  }

  @MessagePattern({ cmd: "getUsers" })
  async getUsers(userIds: string[]): Promise<User[]> {
    return this.userService.getUsers(userIds);
  }

  @MessagePattern({ cmd: "getUserProfile" })
  async getUserProfile(data: { userId: string }): Promise<User> {
    return this.userService.getUserProfile(data.userId);
  }

  @MessagePattern({ cmd: "createUser" })
  async createUser(data: { clerkId: string; name: string; email: string }): Promise<User> {
    return this.userService.createUser(data);
  }

  @MessagePattern({ cmd: "updateUser" })
  async updateUser(data: { userId: string; name: string; email: string }): Promise<User> {
    return this.userService.updateUser(data);
  }
}
