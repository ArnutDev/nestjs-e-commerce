import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @ApiProperty({
    example: 'iPhone 17',
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Latest Apple smartphone',
    required: false,
  })
  description?: string;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    example: 39999,
  })
  price: number;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    example: 50,
  })
  stock: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 1,
    required: false,
  })
  categoryId?: number;
}
