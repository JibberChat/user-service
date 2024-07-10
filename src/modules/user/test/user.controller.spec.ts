import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { GetMeDto } from '../dtos/get-me.dto';
import { GetUsersDto } from '../dtos/get-users.dto';
import { GetUserProfileDto } from '../dtos/get-user-profile.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../user.interface';

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [UserController],
        providers: [
          {
            provide: UserService,
            useValue: {
              getMe: jest.fn(),
              getUsers: jest.fn(),
              getUserProfile: jest.fn(),
              updateUser: jest.fn(),
            },
          },
        ],
      }).compile();
  
      userController = module.get<UserController>(UserController);
      userService = module.get<UserService>(UserService);
    });
  
    it('should be defined', () => {
      expect(userController).toBeDefined();
    });
  
    describe('getMe', () => {
      it('should return a user', async () => {
        const result: User = { id: '1', name: 'test', email: 'test@test.com', createdAt: new Date() };
        jest.spyOn(userService, 'getMe').mockResolvedValue(result);
  
        const dto: GetMeDto = { userId: '1' };
        expect(await userController.getMe(dto)).toStrictEqual(result);
      });
    });
  
    describe('getUsers', () => {
      it('should return an array of users', async () => {
        const result: User[] = [{ id: '1', name: 'test', email: '', createdAt: new Date() }];
        jest.spyOn(userService, 'getUsers').mockResolvedValue(result);
  
        const dto: GetUsersDto = { userIds: ['1'] };
        expect(await userController.getUsers(dto)).toStrictEqual(result);
      });
    });
  
    describe('getUserProfile', () => {
      it('should return a user profile', async () => {
        const result: User = { id: '1', name: 'test', email: 'test@test.com', createdAt: new Date() };
        jest.spyOn(userService, 'getUserProfile').mockResolvedValue(result);
  
        const dto: GetUserProfileDto = { userId: '1' };
        expect(await userController.getUserProfile(dto)).toStrictEqual(result);
      });
    });
  
    describe('updateUser', () => {
      it('should update and return a user', async () => {
        const result: User = { id: '1', name: 'updated', email: 'updated@test.com', createdAt: new Date() };
        jest.spyOn(userService, 'updateUser').mockResolvedValue(result);
  
        const dto: UpdateUserDto = { userId: '1', name: 'updated', email: 'updated@test.com' };
        expect(await userController.updateUser(dto)).toStrictEqual(result);
      });
    });
  });