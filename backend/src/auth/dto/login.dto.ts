import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @ApiProperty({
    example: 'john@example.com',
    description: 'Registered email',
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: 'StrongPassword123',
    description: 'User password',
  })
  password: string;
}
