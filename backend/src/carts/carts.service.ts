import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartsService {
  constructor(private readonly prisma: PrismaService) {}
  async addItem(userId: number, productId: number, quantity: number) {
    //find cart
    let cart = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
    });

    //if dont have just creat new one
    if (!cart) {
      cart = await this.prisma.cart.create({
        data: {
          userId,
        },
      });
    }

    //find item in cart
    const existingItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    //if have item in cart just update quantity
    if (existingItem) {
      return this.prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: existingItem.quantity + quantity,
        },
      });
    }

    //if dont have item in cart just create new cartItem and get item in
    return this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
  }

  create(createCartDto: CreateCartDto) {
    return 'This action adds a new cart';
  }

  findAll() {
    return `This action returns all carts`;
  }

  async getMyCart(userId: number) {
    return this.prisma.cart.findUnique({
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
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  async removeMyItem(userId: number, itemId: number) {
    const item = await this.prisma.cartItem.findFirst({
      where: {
        id: itemId,
      },
      include: {
        cart: true,
      },
    });

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }
    await this.prisma.cartItem.delete({
      where: {
        id: itemId,
      },
    });

    return {
      message: 'Item removed from cart',
    };
  }
}
