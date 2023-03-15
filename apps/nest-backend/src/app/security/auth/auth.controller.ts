import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '../../db/security/user.entity';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  @Get('/user-data')
  @UseGuards(FirebaseAuthGuard)
  getUserData(@GetUser() user: User) {
    return user;
  }
}
