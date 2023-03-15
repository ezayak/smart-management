import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { RolesService } from './roles.service';

@Controller('roles')
@UseGuards(FirebaseAuthGuard)
export class RolesController {
  constructor(private rolesService: RolesService) {}
  @Post()
  createRole(@Body('name') name: string) {
    return this.rolesService.createRole(name);
  }

  @Get()
  getRoles() {
    return this.rolesService.getRoles();
  }
}
