import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsString()
  @ApiProperty({
    example: 'john_doe',
    description: 'Unique username',
  })
  username: string;

  @IsEmail()
  @ApiProperty({
    example: 'john@example.com',
    description: 'User email address',
  })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({
    example: 'StrongPassword123',
    description: 'User password',
  })
  password: string;
}
