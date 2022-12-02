import { Expose } from "class-transformer";
import {ApiProperty} from '@nestjs/swagger';

export class LoginUserRdo{
  @ApiProperty({
    description: 'The unique user ID',
    example: '8ba4bc50-dd6a-406d-96c6-b1164d4f6d5a'
  })
  @Expose({name: '_id'})
  public id;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.local'
  })
  @Expose()
  public email;

  @ApiProperty({
    description: 'Access token'
  })
  @Expose()
  public accessToken: string;
}
