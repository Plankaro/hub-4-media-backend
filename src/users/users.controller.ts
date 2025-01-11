import {
  Body,
  Controller,
  Get,
  UseGuards,
  Put,
  Query,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import {
  AllUsersDto,
  ChangeUserRoleDto,
  EditProfileDto,
  OnboardDto,
  ProfileDto,
} from './dtos';
import { ApiOkResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AbilityGuard } from '../ability/ability.guard';
import { CheckAbilities } from '../ability/ability.decorator';
import { Action } from '../ability/ability.factory';
import { PaginationDto } from '../common/dtos';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOkResponse({ type: ProfileDto })
  @Get('/')
  @UseGuards(AuthGuard())
  getUser(@CurrentUser() user: User) {
    return { user };
  }

  @Put('/onboard')
  @UseGuards(AuthGuard())
  onboard(@CurrentUser() user: User, @Body() body: OnboardDto) {
    return this.usersService.onboard(user, body);
  }

  @ApiOkResponse({ type: ProfileDto })
  @Put('/profile/edit')
  @UseGuards(AuthGuard())
  editProfile(@CurrentUser() user: User, @Body() body: EditProfileDto) {
    return this.usersService.editProfile(user, body);
  }

  // Internal User Controllers
  @ApiOkResponse({ type: AllUsersDto })
  @Get('/admin/users')
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.Manage, subject: User })
  getAllUsers(@Query() query: PaginationDto): Promise<AllUsersDto> {
    return this.usersService.getAllUsers(query);
  }

  @ApiOkResponse({ type: User })
  @Put('/admin/:userId/change-role')
  @UseGuards(AuthGuard())
  @CheckAbilities({ action: Action.Manage, subject: User })
  changeUserRole(
    @Param('userId') userId: string,
    @Body() body: ChangeUserRoleDto,
  ) {
    return this.usersService.changeUserRole(userId, body);
  }
}
