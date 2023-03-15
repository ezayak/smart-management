import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Role } from '../../db/security';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private dataSource: DataSource
  ) {}

  async getRoles(): Promise<Role[]> {
    const query = this.roleRepository.createQueryBuilder('roles');
    return await query.getMany();
  }

  async getRoleById(id: string): Promise<Role> {
    const role = this.roleRepository.findOne({ where: { id } });

    if (!role) {
      throw new NotFoundException();
    }

    return role;
  }

  async createRole(name: string): Promise<Role> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    const role = this.roleRepository.create({
      name,
      isActive: true,
      isToDelete: false,
    });

    try {
      //await this.roleRepository.save(role);
      queryRunner.manager.save(role);
      await queryRunner.commitTransaction();
    } catch (error) {
      //throw new InternalServerErrorException(error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
      return null;
    } finally {
      await queryRunner.release();
    }

    return role;
  }

  async changeIsActive(id: string, isActive: boolean): Promise<void> {
    const role = await this.getRoleById(id);
    role.isActive = isActive;
    this.roleRepository.save(role);
  }

  async changeIsToDelete(id: string, isToDelete: boolean): Promise<void> {
    const role = await this.getRoleById(id);
    role.isActive = isToDelete;
    this.roleRepository.save(role);
  }
}
