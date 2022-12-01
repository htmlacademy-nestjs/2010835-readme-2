import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{
  @ApiProperty({
    description: 'The unique email of user',
    required: true,
    example: 'user@notfound1.local'
  })
  public email: string;

  @ApiProperty({
    description: 'Name of user',
    required: true,
    example: 'Jack'
  })
  public name: string;

  @ApiProperty({
    description: 'Surname of user',
    required: true,
    example: 'Nicholson'
  })
  public surname: string;

  @ApiProperty({
    description: 'User password',
    required: true,
    example: '424242'
  })
  public password: string;
}
