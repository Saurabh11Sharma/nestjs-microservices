import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(createUser: CreateUserDto) {
    return this.usersRepository.create(createUser);
  }

  findOne(loginUser: CreateUserDto) {
    return this.usersRepository.findOne({
      email: loginUser.email,
      password: loginUser.password,
    });
  }
}
