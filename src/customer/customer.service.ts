import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { PrismaService } from '../shared/prisma.service';
import { Customer } from '@prisma/client';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) { }
  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    if (createCustomerDto.email) {
      const existingCustomer = await this.prisma.customer.findUnique({
        where: {
          email: createCustomerDto.email,
        },
      });
      if (existingCustomer) {
        throw new BadRequestException('Customer already exists');
      }
    }
    return this.prisma.customer.create({
      data: createCustomerDto,
    });
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id,
      },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }
}
