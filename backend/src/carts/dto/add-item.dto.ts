import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class AddItemDto {
  @IsInt()
  @ApiProperty({
    example: 4,
    description: 'Product ID',
  })
  productId: number;

  @IsInt()
  @Min(1)
  @ApiProperty({
    example: 2,
    description: 'Quantity',
  })
  quantity: number;
}
