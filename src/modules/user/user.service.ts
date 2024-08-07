import { Injectable } from "@nestjs/common";

import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { User } from "./interfaces/user.interface";

import { PrismaService } from "@infrastructure/database/services/prisma.service";

import MESSAGES from "@helpers/messages/http-messages";
import { prismaCatchNotFound } from "@helpers/prisma/catch-not-found";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers(userIds: string[]): Promise<User[]> {
    return await this.prismaService.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }

  async getUserProfile(userId: string): Promise<User> {
    return await this.prismaService.user
      .findUniqueOrThrow({ where: { id: userId }, select: { id: true, name: true, email: true, createdAt: true } })
      .catch(prismaCatchNotFound(MESSAGES.USER_NOT_FOUND));
  }

  async getUserByEmail(userEmail: string): Promise<User> {
    return await this.prismaService.user
      .findUniqueOrThrow({
        where: { email: userEmail },
        select: { id: true, name: true, email: true, createdAt: true },
      })
      .catch(prismaCatchNotFound(MESSAGES.USER_NOT_FOUND));
  }

  async createUser(data: CreateUserDto): Promise<User> {
    return await this.prismaService.user.upsert({
      where: { email: data.email },
      create: {
        id: data.clerkId,
        name: data.name,
        email: data.email,
      },
      update: {
        id: data.clerkId,
        name: data.name,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }

  async updateUser(data: UpdateUserDto): Promise<User> {
    await this.prismaService.user
      .findUniqueOrThrow({ where: { id: data.userId } })
      .catch(prismaCatchNotFound(MESSAGES.USER_NOT_FOUND));

    return await this.prismaService.user.update({
      where: { id: data.userId },
      data: {
        name: data.name,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }
}
