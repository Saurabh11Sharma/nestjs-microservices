import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUser: CreateUserDto) {
    await this.validateCreateUserDto(createUser);
    const newUser = {
      ...createUser,
      password: bcrypt.hash(createUser.password, 10),
    } as unknown as CreateUserDto;
    return this.usersRepository.create(newUser);
  }

  private async validateCreateUserDto(createUser: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      email: createUser.email,
    });
    if (user) {
      throw new UnprocessableEntityException('Email already exists.');
    } else {
      return user;
    }
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      email,
    });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return this.usersRepository.findOne(getUserDto);
  }
}
