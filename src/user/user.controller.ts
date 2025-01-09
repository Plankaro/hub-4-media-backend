import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpsertUserParamRoleDto } from './dto/create-user.dto';
import { GetUserByDto, GetUserByRoleDto } from './dto/get-user.dto';
import { DeleteUsersDto } from './dto/delete-user.dto';
import {
  CreateExperienceDto,
  CreateProjectDto,
  UpdateExperienceDto,
  UpdateProjectDto,
  UpdateUserDto,
} from './dto/update-user.dto';
import { ForgotPassword } from './dto/forgot-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserSessionFromJwtStrategy } from '../auth/decorators/session/user.decorator';
import { SessionUser } from '../auth/interfaces/user.interface';
import { ContactUsDto } from './dto/contact-us.dto';
import { SkipJwt } from 'src/auth/decorators/jwt/skip-jwt.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SkipJwt()
  @Post('send-otp')
  sendOtp(@Body('email') email: string): Promise<any> {
    return this.userService.sendOtp(email);
  }

  @SkipJwt()
  @Post('verify-otp')
  verifyOtp(
    @Body('email') email: string,
    @Body('otp') otp: number,
  ): Promise<any> {
    return this.userService.verifyOtp(email, otp);
  }

  @Post('project')
  postProject(
    // @Param() params: UpsertUserParamRoleDto,
    @Body() data: CreateProjectDto,
  ) {
    return this.userService.postProject(data);
  }
  @Get('project')
  getAllProject(@Query('userId') userId: string) {
    return this.userService.getAllProject(userId);
  }

  @Post('experience')
  postExperience(
    // @Param() params: UpsertUserParamRoleDto,
    @Body() data: CreateExperienceDto,
  ) {
    return this.userService.postExperience(data);
  }
  @Get('experience')
  getAllExperience(@Query('userId') userId: string) {
    return this.userService.getAllExperience(userId);
  }
  @Get('skills')
  getAllSkills(@Query('userId') userId: string) {
    return this.userService.getAllSkills(userId);
  }

  @Post('skills')
  postSkills(
    @Query('userId') userId: string,
    @Body('skills') skills: string[],
  ) {
    return this.userService.postSkills(userId, skills);
  }

  @Delete('skills')
  deleteSkills(
    @Query('userId') userId: string,
    @Body('skills') skills: string,
  ) {
    return this.userService.deleteSkills(userId, skills);
  }

  @SkipJwt()
  @Post('/:role')
  createUser(
    @Param() params: UpsertUserParamRoleDto,
    @Body() data: CreateUserDto,
  ) {
    return this.userService.createUser(params.role, data);
  }

  @Put('/:role')
  updateUser(
    @Param() params: UpsertUserParamRoleDto,
    @Body() data: UpdateUserDto,
  ) {
    return this.userService.updateUser(params.role, data);
  }

  @SkipJwt()
  @Patch('forgotpassword')
  forgotPassword(@Body() data: ForgotPassword): Promise<any> {
    return this.userService.forgotPassword(data);
  }

  @Patch('change-password')
  changePassword(
    @Body() data: ChangePasswordDto,
    @UserSessionFromJwtStrategy() user: SessionUser,
  ) {
    return this.userService.changePassword(data, user);
  }

  @SkipJwt()
  @Get('/all/:role?')
  getAllUsers(@Param() params: GetUserByRoleDto) {
    return this.userService.getAllUsers(params);
  }

  @Delete()
  deleteUser(@Body() body: DeleteUsersDto) {
    return this.userService.deleteUser(body);
  }

  @SkipJwt()
  @Get('/students-count')
  getSudentsCount() {
    return this.userService.getSudentsCount();
  }

  @Get('/:id')
  getUserById(@Param() params: GetUserByDto) {
    return this.userService.getUserById(params);
  }
}
