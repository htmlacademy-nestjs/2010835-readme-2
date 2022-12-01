import {ApiProperty} from '@nestjs/swagger';

export class LoginUserDto{
  @ApiProperty({
    description: 'The unique email of user',
    required: true,
    example: 'user@notfound1.local'
  })
  public email: string;

  @ApiProperty({
    description: 'User password',
    required: true,
    example: '424242'
  })
  public password: string;
}
