import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Customer } from '.prisma/client';
import { PrismaService } from '../shared/prisma.service';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

describe('CustomerService', () => {
  let service: CustomerService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerService, PrismaService],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('create', () => {
    it('should create a new customer', async () => {
      const createCustomerDto: CreateCustomerDto = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        postalCode: 12345,
      };

      const createdCustomer = await service.create(createCustomerDto);

      expect(createdCustomer).toHaveProperty('id');
      expect(createdCustomer.name).toEqual('John Doe');
      expect(createdCustomer.email).toEqual('johndoe@example.com');
      expect(createdCustomer.postalCode).toEqual(12345);
    });

    it('should throw BadRequestException when customer already exists', async () => {
      const createCustomerDto: CreateCustomerDto = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        postalCode: 12345,
      };
      const mockCustomer: Customer = {
        id: 1,
        ...createCustomerDto,
      };

      jest.spyOn(prismaService.customer, 'findUnique').mockResolvedValue(mockCustomer);

      await expect(service.create(createCustomerDto)).rejects.toThrow(BadRequestException);
    });

  });

  describe('findOne', () => {
    it('should find a customer by id', async () => {
      const customer: Customer = {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        postalCode: 12345,
      };

      jest.spyOn(prismaService.customer, 'findUnique').mockResolvedValue(customer);

      const foundCustomer = await service.findOne(1);

      expect(foundCustomer).toEqual(customer);
    });

    it('should throw a NotFoundException when the customer does not exist', async () => {
      jest.spyOn(prismaService.customer, 'findUnique').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });
});
