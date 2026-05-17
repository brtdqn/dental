import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const verificationCode = crypto.randomInt(100000, 999999).toString();

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        role: dto.role,
        isVerified: false,
        verificationCode,
        profile: {
          create: {
            fullName: dto.fullName,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    // TODO: Send this code via Nodemailer in the future.
    console.log(`[EMAIL SIMULATION] Sending verification code ${verificationCode} to ${user.email}`);

    return {
      message: 'Verification code sent',
      email: user.email,
    };
  }

  async verifyEmail(email: string, code: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('User not found');
    if (user.isVerified) throw new ConflictException('Already verified');
    if (user.verificationCode !== code) throw new UnauthorizedException('Invalid verification code');

    const updatedUser = await this.prisma.user.update({
      where: { email },
      data: { isVerified: true, verificationCode: null },
    });

    return this.generateTokens(updatedUser.id, updatedUser.email, updatedUser.role);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isVerified) {
      throw new UnauthorizedException('Please verify your email first');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user.id, user.email, user.role);
  }

  private async generateTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };
    
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: userId,
        email,
        role,
      },
    };
  }
}
