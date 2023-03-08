import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/user.entity';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  @Get('/user-data')
  @UseGuards(AuthGuard('jwt'))
  getUserData(@GetUser() user: User) {
    return user;
  }
}
