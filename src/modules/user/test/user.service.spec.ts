import { Test, TestingModule } from "@nestjs/testing";

import { UserService } from "../user.service";

import { PrismaService } from "@infrastructure/database/services/prisma.service";

// Mock PrismaService
interface PrismaUser {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

describe("UserService", () => {
  let service: UserService;
  let prismaService: PrismaService;

  // Mock PrismaService methods
  const mockPrismaService = {
    user: {
      findMany: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getUsers", () => {
    it("should return an array of users", async () => {
      const result: PrismaUser[] = [
        {
          id: "1",
          name: "test",
          email: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(prismaService.user, "findMany").mockResolvedValue(result);

      expect(await service.getUsers(["1"])).toStrictEqual(result);
    });
  });

  describe("getUserProfile", () => {
    it("should return a user profile", async () => {
      const result: PrismaUser = {
        id: "1",
        name: "test",
        email: "test@test.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prismaService.user, "findUniqueOrThrow").mockResolvedValue(result);

      expect(await service.getUserProfile("1")).toStrictEqual(result);
    });
  });

  describe("updateUser", () => {
    it("should update and return a user", async () => {
      const result: PrismaUser = {
        id: "1",
        name: "updated",
        email: "updated@test.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prismaService.user, "update").mockResolvedValue(result);

      expect(
        await service.updateUser({
          userId: "1",
          name: "updated",
        })
      ).toStrictEqual(result);
    });
  });
});
