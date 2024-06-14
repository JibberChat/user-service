import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import { User } from './user.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'getMe' })
  async getMe(userId: string): Promise<User> {
    return await this.userService.getMe(userId);
  }

  @MessagePattern({ cmd: 'getUserProfile' })
  async getUserProfile(userId: string): Promise<User> {
    return this.userService.getUserProfile(userId);
  }
}
