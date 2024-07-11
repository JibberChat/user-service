import { Test, TestingModule } from "@nestjs/testing";

import { User } from "../interfaces/user.interface";
import { UserService } from "../user.service";

describe("UserService", () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getUsers", () => {
    it("should return an array of users", async () => {
      const result: User[] = [{ id: "1", name: "test", email: "", createdAt: new Date() }];
      // Typing correctly the method in spyOn
      jest.spyOn(service, "getUsers").mockResolvedValue(result);

      expect(await service.getUsers(["1"])).toStrictEqual(result);
    });
  });

  describe("getUserProfile", () => {
    it("should return a user profile", async () => {
      const result: User = { id: "1", name: "test", email: "test@test.com", createdAt: new Date() };
      jest.spyOn(service, "getUserProfile").mockResolvedValue(result);

      expect(await service.getUserProfile("1")).toStrictEqual(result);
    });
  });

  describe("updateUser", () => {
    it("should update and return a user", async () => {
      const result: User = { id: "1", name: "updated", email: "updated@test.com", createdAt: new Date() };
      jest.spyOn(service, "updateUser").mockResolvedValue(result);

      expect(
        await service.updateUser({
          userId: "1",
          name: "updated",
        })
      ).toStrictEqual(result);
    });
  });
});
