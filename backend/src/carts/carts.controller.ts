import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddItemDto } from './dto/add-item.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Carts')
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @ApiOperation({
    summary: 'Add product to cart',
  })
  @Post('add-item')
  @UseGuards(JwtAuthGuard)
  addItem(@Request() req, @Body() dto: AddItemDto) {
    return this.cartsService.addItem(
      req.user.userId,
      dto.productId,
      dto.quantity,
    );
  }

  @ApiOperation({
    summary: 'Get current user cart',
  })
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMyCart(@Request() req) {
    return this.cartsService.getMyCart(req.user.userId);
  }

  @ApiOperation({
    summary: 'Remove product from cart',
  })
  @Delete('items/:id')
  @UseGuards(JwtAuthGuard)
  removeMyItem(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.cartsService.removeMyItem(req.user.userId, id);
  }
}
