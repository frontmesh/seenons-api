import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateCustomerDto {

  @ApiProperty({
    description: 'Customer name',
    example: "Customer",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email address',
    example: 'email@example.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Postal code',
    example: 1150,
  })
  @IsNumber()
  @IsOptional()
  postalCode: number;
}
