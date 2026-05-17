import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async update(userId: string, dto: UpdateProfileDto) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return this.prisma.profile.update({
      where: { userId },
      data: {
        fullName: dto.fullName,
        phone: dto.phone,
        address: dto.address,
        clinicName: dto.clinicName,
        specialties: dto.specialties,
      },
    });
  }

  async findProducers(specialty?: string, address?: string) {
    return this.prisma.user.findMany({
      where: {
        role: 'PRODUCER',
        profile: {
          address: address || undefined,
          specialties: specialty ? { has: specialty } : undefined,
        },
      },
      include: { profile: true },
    });
  }

  async findOne(userId: string) {
    return this.prisma.profile.findUnique({
      where: { userId },
      include: { user: { select: { email: true, role: true } } },
    });
  }
}
