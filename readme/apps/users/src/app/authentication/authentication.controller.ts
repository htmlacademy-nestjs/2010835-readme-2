import { Controller, Post, Body } from '@nestjs/common';
import { fillObject } from '@readme/core';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserRdo } from './rdo/create-user.rdo';
import { LoginUserRdo } from './rdo/login-user.rdo';

@Controller('authentication')
export class AuthenticationController {

  constructor(
    private readonly authenticationService: AuthenticationService
  ){}

  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto){
    const createdUser = await this.authenticationService.create(createUserDto);

    return fillObject(CreateUserRdo, createdUser);
  }

  @Post('login')
  public async verify(@Body() loginUserDto: LoginUserDto){
    const verifiedUser = await this.authenticationService.verify(loginUserDto);

    return fillObject(LoginUserRdo, verifiedUser);
  }


}
