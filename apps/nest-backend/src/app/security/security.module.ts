import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    RolesModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [],
  exports: [UsersModule, RolesModule, AuthModule],
})
export class SecurityModule {}
