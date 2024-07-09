import { randomUUID } from "crypto";

import { ConflictException, Injectable } from "@nestjs/common";

import { User } from "./user.interface";

import { PrismaService } from "@infrastructure/database/services/prisma.service";

import MESSAGES from "@helpers/messages/http-messages";
import { prismaCatchNotFound } from "@helpers/prisma/catch-not-found";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMe(userId: string): Promise<User> {
    return await this.prismaService.user
      .findUniqueOrThrow({ where: { id: userId }, select: { id: true, name: true, email: true, createdAt: true } })
      .catch(prismaCatchNotFound(MESSAGES.USER_NOT_FOUND));
  }

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

  async createUser(data: { clerkId: string; name: string; email: string }): Promise<User> {
    const userExist = await this.prismaService.user.findUnique({ where: { id: data.clerkId } });
    if (userExist) throw new ConflictException(MESSAGES.USER_ALREADY_EXIST);

    return await this.prismaService.user.create({
      data: {
        // id: data.clerkId,
        id: randomUUID(),
        name: data.name,
        email: data.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }

  async updateUser(data: { userId: string; name: string; email: string }): Promise<User> {
    await this.prismaService.user
      .findUniqueOrThrow({ where: { id: data.userId } })
      .catch(prismaCatchNotFound(MESSAGES.USER_NOT_FOUND));

    return await this.prismaService.user.update({
      where: { id: data.userId },
      data: {
        name: data.name,
        email: data.email,
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
