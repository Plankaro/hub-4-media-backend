import { IsEnum, IsString } from 'class-validator';
import { AuthProvider } from '../../users/types/account-type';

export class AuthProviderDto {
  @IsEnum(AuthProvider)
  provider: AuthProvider;

  @IsString()
  providerAuthId: string;
}
