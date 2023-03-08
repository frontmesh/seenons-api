import { Controller, Get, Query } from '@nestjs/common';
import { DayOfWeek } from '@prisma/client';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ProviderService } from './provider.service';
import { FindServicesDto } from './dto/find-services.dto';

@Controller('providers')
export class ProviderController {
  constructor(private service: ProviderService) { }


  @Get()
  @ApiQuery({ name: 'postalCode', type: Number })
  @ApiQuery({ name: 'weekdays', type: [String], required: false, isArray: true, enum: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'] })
  @ApiResponse({ status: 200, description: 'Services found successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async findServices(
    @Query() query: FindServicesDto
  ) {
    const { postalCode, weekdays } = query;
    return this.service.findServices(postalCode, weekdays);
  }
}
