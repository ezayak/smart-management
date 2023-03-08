import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { AuthStrategy } from './auth.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([User])],
  providers: [AuthStrategy, AuthService],
  exports: [AuthStrategy, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
