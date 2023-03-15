import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { FirebaseAuthGuard } from './auth/firebase-auth.guard';
import { RolesModule } from './roles/roles.module';
import { User } from '../db/security/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    RolesModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [FirebaseAuthGuard],
  exports: [UsersModule, RolesModule, AuthModule],
})
export class SecurityModule {}
