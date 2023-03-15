import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersFilterDto } from './dto/users-filter.dto';
import { UserRoleDto } from './dto/user-role.dto';
import { User } from '../../db/security';

import { UsersService } from './users.service';
import { RolesGuard } from '../roles/roles.guard';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Get()
  getUsers(@Query() filterDto: UsersFilterDto): Promise<User[]> {
    return this.usersService.getUsers(filterDto);
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Post()
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Delete('/:id')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  deleteUser(@Param('id') id: string): Promise<boolean> {
    return this.usersService.deleteUser(id);
  }

  // @Put()
  // updateUser(@Body() updateUser: UpdateUserDto): boolean {
  //   return this.usersService.updateUser(updateUser);
  // }

  @Patch('/:id/role')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  changeUserRole(
    @Param('id') id: string,
    @Body() userRoleDto: UserRoleDto
  ): Promise<boolean> {
    const { role } = userRoleDto;
    return this.usersService.updateRole(id, role);
  }
}
