import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { User } from "./interfaces/user.interface";
import { UserService } from "./user.service";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: "getMe" })
  async getMe(data: { userId: string }): Promise<User> {
    return await this.userService.getUserProfile(data.userId);
  }

  @MessagePattern({ cmd: "getUsers" })
  async getUsers(data: { userIds: string[] }): Promise<User[]> {
    return this.userService.getUsers(data.userIds);
  }

  @MessagePattern({ cmd: "getUserProfile" })
  async getUserProfile(data: { userId: string }): Promise<User> {
    return this.userService.getUserProfile(data.userId);
  }

  @MessagePattern({ cmd: "getUserByEmail" })
  async getUserByEmail(data: { userEmail: string }): Promise<User> {
    return this.userService.getUserByEmail(data.userEmail);
  }

  @MessagePattern({ cmd: "createUser" })
  async createUser(data: CreateUserDto): Promise<User> {
    return this.userService.createUser(data);
  }

  @MessagePattern({ cmd: "updateUser" })
  async updateUser(data: UpdateUserDto): Promise<User> {
    return this.userService.updateUser(data);
  }
}
