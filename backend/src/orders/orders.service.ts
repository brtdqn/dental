import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/order.dto';
import { OrderStatus } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';
import NotificationsGateway from '../notifications/notifications.gateway';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
    private notificationsGateway: NotificationsGateway,
  ) {}

  async create(customerId: string, dto: CreateOrderDto) {
    return this.prisma.order.create({
      data: {
        customerId,
        category: dto.category,
        description: dto.description || '',
        deadline: new Date(dto.deadline),
        budget: dto.budget,
        urgency: dto.urgency || 'NORMAL',
        totalAmount: dto.totalAmount,
        status: OrderStatus.PENDING,
      },
    });
  }

  async addFiles(orderId: string, files: Express.Multer.File[]) {
    const fileData = files.map(file => ({
      orderId,
      url: `/uploads/${file.filename}`,
      name: file.originalname,
      type: file.mimetype,
      size: file.size,
    }));

    return this.prisma.file.createMany({
      data: fileData,
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        customer: {
          select: { profile: true, email: true }
        },
        producer: {
          select: { profile: true, email: true }
        },
      },
    });
  }

  async findByCustomer(customerId: string) {
    return this.prisma.order.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByProducer(producerId: string) {
    return this.prisma.order.findMany({
      where: { producerId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: string, status: OrderStatus) {
    const order = await this.prisma.order.update({
      where: { id },
      data: { status },
      include: { customer: true }
    });

    // Notify customer
    const msg = `Siparişiniz (#${id.slice(0, 4)}) yeni duruma güncellendi: ${status}`;
    const notification = await this.notificationsService.create(order.customerId, 'ORDER_UPDATE', msg);
    
    // Emit real-time
    this.notificationsGateway.sendNotification(order.customerId, notification);

    return order;
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        files: true,
        customer: { select: { profile: true } },
        producer: { select: { profile: true } },
      },
    });

    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
}
