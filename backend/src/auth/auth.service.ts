import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const { email, username, password } = dto;

    // 1. check email exists
    const emailExists = await this.usersService.findByEmail(email);
    if (emailExists) {
      throw new BadRequestException('Email already exists');
    }

    // 2. check username exists
    const usernameExists = await this.usersService.findByUsername(username);
    if (usernameExists) {
      throw new BadRequestException('Username already exists');
    }

    // 3. hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. create user
    const user = await this.usersService.createUser({
      email,
      username,
      password: hashedPassword,
    });

    // 5. remove password from response
    const { password: _, ...result } = user;

    return result;
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;

    // Find user
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Create JWT payload
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    // Sign token
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }
}
