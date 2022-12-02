import { Expose } from "class-transformer";
import {ApiProperty} from '@nestjs/swagger';

export class ShowUserRdo{

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
    description: 'Name of user',
    required: true,
    example: 'Jack'
  })
  @Expose()
  public name;

  @ApiProperty({
    description: 'Surname of user',
    required: true,
    example: 'Nicholson'
  })
  @Expose()
  public surname;

  @Expose()
  public avatar;

  @ApiProperty({
    description: 'User registration date',
    required: true,
    example: '2022-12-01T20:22:32.847Z'
  })
  @Expose()
  public registerDate;
}
