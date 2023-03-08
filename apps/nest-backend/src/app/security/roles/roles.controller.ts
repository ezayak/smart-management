import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesService } from './roles.service';

@Controller('roles')
@UseGuards(AuthGuard('jwt'))
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
