import { UserRole } from './user-role';

export interface JwtPayload {
  id: string;
  email: string;
  userRole: UserRole;
  isAdmin: boolean;
}
