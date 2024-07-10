import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { GetMeDto } from "./dtos/get-me.dto";
import { GetUsersDto } from "./dtos/get-users.dto";
import { GetUserProfileDto } from "./dtos/get-user-profile.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { User } from "./user.interface";
import { UserService } from "./user.service";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: "getMe" })
  async getMe(@Payload() data: GetMeDto): Promise<User> {
    return await this.userService.getMe(data.userId);
  }

  @MessagePattern({ cmd: "getUsers" })
  async getUsers(@Payload() data: GetUsersDto): Promise<User[]> {
    return this.userService.getUsers(data.userIds);
  }

  @MessagePattern({ cmd: "getUserProfile" })
  async getUserProfile(@Payload() data: GetUserProfileDto): Promise<User> {
    return this.userService.getUserProfile(data.userId);
  }

  @MessagePattern({ cmd: "updateUser" })
  async updateUser(@Payload() data: UpdateUserDto): Promise<User> {
    return this.userService.updateUser(data.userId, data.name, data.email);
  }
}
