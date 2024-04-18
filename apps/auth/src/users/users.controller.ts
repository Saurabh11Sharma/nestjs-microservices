import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { currentUser } from '../decorators/current-user.decorator';
import { UserDocument } from './models/user.schema';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUser: CreateUserDto) {
    return this.usersService.create(createUser);
  }

  @Post('/login')
  async login(@Body() loginUser: CreateUserDto) {
    return this.usersService.verifyUser(loginUser.email, loginUser.password);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@currentUser() user: UserDocument) {
    return user;
  }
}
