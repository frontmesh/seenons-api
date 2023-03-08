import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerService } from './customer.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @ApiOperation({ summary: 'Create a customer' })
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return plainToInstance(
      CreateCustomerDto,
      this.customerService.create(createCustomerDto),
    );
  }

  @ApiOperation({ summary: 'Find a customer by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }
}
