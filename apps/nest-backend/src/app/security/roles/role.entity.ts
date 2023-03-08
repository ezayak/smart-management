import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 64 })
  name: string;

  @Column('bool')
  isActive: boolean;

  @Column('bool')
  isToDelete: boolean;

  @OneToMany(() => User, (user) => user.id, { eager: false })
  user: User[];
}
