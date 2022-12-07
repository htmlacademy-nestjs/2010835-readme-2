import { Injectable } from '@nestjs/common';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.constants';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';


@Injectable()
export class AuthenticationService{
  constructor(
    private readonly repository : BlogUserRepository,
  ){}

  public async create(createUserDto: CreateUserDto){
    if(await this.repository.findByEmail(createUserDto.email)){
      throw new Error(AUTH_USER_EXISTS);
    }

    const {name, surname, email, password} = createUserDto;
    const user = {name, surname, email, passwordHash: '', avatar: '', registerDate: new Date(), postQuantity: 0, subscribersQuantity: 0};
    const userEntity = new BlogUserEntity(user);
    await userEntity.setPassword(password);

    return this.repository.create(userEntity);
  }

  public async verify(loginUserDto: LoginUserDto){
    const existUser = await this.repository.findByEmail(loginUserDto.email);

    if(!existUser){
      throw new Error(AUTH_USER_NOT_FOUND);
    }

    const userEntity = new BlogUserEntity(existUser);

    if(!userEntity.comparePassword(loginUserDto.password)){
      throw new Error(AUTH_USER_PASSWORD_WRONG);
    }

    return userEntity.toObject();
  }

  public async getUser(id: string){
    return this.repository.findById(id);
  }
}

