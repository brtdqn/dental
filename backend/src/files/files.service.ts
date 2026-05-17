import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {
    const uploadDir = join(process.cwd(), 'uploads');
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir);
    }
  }

  async saveFileData(orderId: string, file: Express.Multer.File) {
    return this.prisma.file.create({
      data: {
        orderId,
        url: `/uploads/${file.filename}`,
        name: file.originalname,
        type: file.mimetype,
        size: file.size,
      },
    });
  }
}
