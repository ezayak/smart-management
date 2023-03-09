import { Role } from './role.model';

export interface User {
  id: string;
  name: string;
  lastname: string;
  role: Role;
  phoneNumber: string;
  email: string;
  dob: string;
  comments: string;
  isActive: boolean;
  isToDelete: boolean;
}
