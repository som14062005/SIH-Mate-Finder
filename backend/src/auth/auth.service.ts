import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signup(data: SignupDto) {
    // ✅ Check if email already exists
    const userExists = await this.userModel.findOne({ email: data.email });
    if (userExists) {
      throw new BadRequestException('Email already registered');
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // ✅ Create new user (only email + password)
    const newUser = new this.userModel({
      email: data.email,
      password: hashedPassword,
    });

    await newUser.save();

    return { message: 'User registered successfully' };
  }

  async login(data: LoginDto) {
    const user = await this.userModel.findOne({ email: data.email });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordMatch = await bcrypt.compare(data.password, user.password);
    if (!isPasswordMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user._id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    };
  }
}
