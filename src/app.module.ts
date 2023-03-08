import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CustomerModule } from './customer/customer.module';
import { ProviderModule } from './provider/provider.module';

@Module({
  imports: [CustomerModule, ProviderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
