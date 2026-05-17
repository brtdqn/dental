import { Injectable } from '@nestjs/common';
import { CreateAdDto } from './dto/create-ad.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdsService {
  constructor(private prisma: PrismaService) {}

  create(createAdDto: CreateAdDto) {
    return this.prisma.ad.create({ data: createAdDto as any });
  }

  findAll() {
    return this.prisma.ad.findMany({ where: { isActive: true } });
  }

  remove(id: string) {
    return this.prisma.ad.delete({ where: { id } });
  }
}
