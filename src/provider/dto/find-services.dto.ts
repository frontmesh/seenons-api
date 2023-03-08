import { IsInt, IsOptional, IsArray, IsEnum, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DayOfWeek } from '@prisma/client';

export class FindServicesDto {
  @ApiProperty({
    description: 'Postal code to search for providers',
    example: 1150,
  })
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  postalCode: number;

  @ApiProperty({
    description: 'Days of week to search for available slots',
    example: ['MONDAY', 'TUESDAY'],
  })
  @IsOptional()
  @Transform(({ value }) => Array.isArray(value) ? value : [value], { toClassOnly: true })
  @Type(() => String)
  @IsEnum(DayOfWeek, { each: true })
  weekdays?: DayOfWeek[] | DayOfWeek;
}
