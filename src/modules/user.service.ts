import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor() {}

  getUsers(): string {
    return 'Hello World!';
  }
}
