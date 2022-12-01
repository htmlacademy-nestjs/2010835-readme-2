import { Controller, Post, Body, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { fillObject } from '@readme/core';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserRdo } from './rdo/create-user.rdo';
import { LoginUserRdo } from './rdo/login-user.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { ShowUserRdo } from './rdo/show-user.rdo';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {

  constructor(
    private readonly authenticationService: AuthenticationService
  ){}

  @Post('register')
  @ApiResponse({
    type: CreateUserRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  public async register(@Body() createUserDto: CreateUserDto){
    const createdUser = await this.authenticationService.create(createUserDto);

    return fillObject(CreateUserRdo, createdUser);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LoginUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  public async verify(@Body() loginUserDto: LoginUserDto){
    const verifiedUser = await this.authenticationService.verify(loginUserDto);

    return fillObject(LoginUserRdo, verifiedUser);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: ShowUserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  async show(@Param('id') id: string) {
    const existUser = await this.authenticationService.getUser(id);
    return fillObject(ShowUserRdo, existUser);
  }
}
