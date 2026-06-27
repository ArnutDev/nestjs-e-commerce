import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({
    summary: 'Checkout current cart',
  })
  @Post('checkout')
  @UseGuards(JwtAuthGuard)
  checkOut(@Request() req) {
    return this.ordersService.checkOut(req.user.userId);
  }

  @ApiOperation({
    summary: 'Get current user orders',
  })
  @Get('me')
  @UseGuards(JwtAuthGuard)
  findMyOrders(@Request() req) {
    return this.ordersService.findMyOrders(req.user.userId);
  }

  @ApiOperation({
    summary: 'Get order details',
  })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOneOrder(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.ordersService.findOneOrder(id, req.user.userId);
  }
}
