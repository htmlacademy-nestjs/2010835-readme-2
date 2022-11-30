import { Injectable } from '@nestjs/common';
import { BlogUserMemoryRepository } from '../blog-user/blog-user-memory.repository';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.constants';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';


@Injectable()
export class AuthenticationService{
  constructor(
    private readonly repository : BlogUserMemoryRepository
  ){}

  async create(createUserDto: CreateUserDto){
    console.log(await this.repository.findByEmail(createUserDto.email));

    if(await this.repository.findByEmail(createUserDto.email)){
      throw new Error(AUTH_USER_EXISTS);
    }

    const {name, surname, email, password} = createUserDto;
    const user = {name, surname, email, passwordHash: '', avatar: '', registerDate: new Date(), postQuantity: 0, subscribersQuantity: 0};
    const userEntity = new BlogUserEntity(user);
    userEntity.setPassword(password);

    return this.repository.create(userEntity);
  }

  async verify(loginUserDto: LoginUserDto){
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

