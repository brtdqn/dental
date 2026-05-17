import { Controller, Post, Body, Get, Param, Patch, UseGuards, Req } from '@nestjs/common';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/bid.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('bids')
@UseGuards(JwtAuthGuard)
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @Post()
  create(@Req() req: any, @Body() dto: CreateBidDto) {
    return this.bidsService.create(req.user.userId, dto);
  }

  @Get('order/:orderId')
  findByOrder(@Param('orderId') orderId: string) {
    return this.bidsService.findByOrder(orderId);
  }

  @Patch(':id/accept')
  accept(@Param('id') id: string, @Req() req: any) {
    return this.bidsService.acceptBid(id, req.user.userId);
  }
}
