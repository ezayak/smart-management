import { IsOptional, IsString } from 'class-validator';
import { Role } from '../../../db/security/role.entity';

export class UsersFilterDto {
  @IsOptional()
  role?: Role;

  @IsOptional()
  @IsString()
  search?: string;
}
