import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { PrismaService } from '../shared/prisma.service';

@Module({
  providers: [PrismaService, ProviderService],
  controllers: [ProviderController],
})
export class ProviderModule { }
