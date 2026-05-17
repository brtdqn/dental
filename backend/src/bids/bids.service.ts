import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBidDto } from './dto/bid.dto';
import { BidStatus } from '@prisma/client';

@Injectable()
export class BidsService {
  constructor(private prisma: PrismaService) {}

  async create(producerId: string, dto: CreateBidDto) {
    // Logic to check if user is a producer
    const user = await this.prisma.user.findUnique({ where: { id: producerId } });
    if (user?.role !== 'PRODUCER') {
      throw new ForbiddenException('Only producers can bid');
    }

    return this.prisma.bid.create({
      data: {
        orderId: dto.orderId,
        producerId,
        amount: dto.amount,
        deliveryDate: new Date(dto.deliveryDate),
        note: dto.note,
      },
    });
  }

  async findByOrder(orderId: string) {
    return this.prisma.bid.findMany({
      where: { orderId },
      include: { producer: { select: { profile: true } } },
    });
  }

  async acceptBid(bidId: string, customerId: string) {
    const bid = await this.prisma.bid.findUnique({
      where: { id: bidId },
      include: { order: true },
    });

    if (!bid || bid.order.customerId !== customerId) {
      throw new ForbiddenException('Unauthorized');
    }

    return this.prisma.$transaction([
      this.prisma.bid.update({
        where: { id: bidId },
        data: { status: BidStatus.ACCEPTED },
      }),
      this.prisma.order.update({
        where: { id: bid.orderId },
        data: { 
          status: 'ACCEPTED',
          producerId: bid.producerId,
          totalAmount: bid.amount 
        },
      }),
    ]);
  }
}
