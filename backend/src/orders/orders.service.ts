import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order } from './entities/order.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async checkOut(userId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!cart) {
      throw new BadRequestException('Cart not found');
    }

    if (cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    for (const item of cart.items) {
      if (item.quantity > item.product.stock) {
        throw new BadRequestException(
          `Not enough stock for ${item.product.name}`,
        );
      }
    }

    let totalPrice = 0;

    for (const item of cart.items) {
      totalPrice += Number(item.product.price) * item.quantity;
    }
    const order = await this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId,
          totalPrice,
        },
      });
      // create order items
      for (const item of cart.items) {
        await tx.orderItem.create({
          data: {
            orderId: order.id,
            productId: item.productId,
            productName: item.product.name,
            priceAtPurchase: item.product.price,
            quantity: item.quantity,
          },
        });
      }
      // update stock
      for (const item of cart.items) {
        await tx.product.update({
          where: {
            id: item.productId,
          },
          data: {
            stock: item.product.stock - item.quantity,
          },
        });
      }
      // clear cart
      await tx.cartItem.deleteMany({
        where: {
          cartId: cart.id,
        },
      });

      return tx.order.findUnique({
        where: {
          id: order.id,
        },
        include: {
          items: true,
        },
      });
    });

    return order;
  }

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return this.prisma.order.findMany({
      include: {
        items: true,
      },
    });
  }

  async findMyOrders(userId: number): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOneOrder(id: number, userId: number): Promise<Order> {
    const order = await this.prisma.order.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        items: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }
}
