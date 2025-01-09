import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RoleType } from '@prisma/client';
import { Transform } from 'class-transformer';

export class GetUserByDto {
  @IsNotEmpty()
  id: string;
}

export class GetUserFromWebsocket {

  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  courseSlug: string;

  // @IsOptional()
  // @IsString()
  // role: RoleType
}

export class GetUserByRoleDto {
  @IsEnum(RoleType)
  @Transform(({ value }) => value.toUpperCase())
  @IsNotEmpty()
  role: RoleType;
}
