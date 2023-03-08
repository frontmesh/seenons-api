import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';
import { DayOfWeek } from '@prisma/client';

@Injectable()
export class ProviderService {
  constructor(private prismaService: PrismaService) { }

  async findServices(
    postalCode: number,
    weekdays?: Array<DayOfWeek> | DayOfWeek,
  ): Promise<any> {
    const res = await this.prismaService.provider.findMany({
      where: {
        postalCodeRanges: {
          some: {
            start: { lte: postalCode },
            end: { gte: postalCode },
          },
        },
        availableSlots: {
          some: {
            dayOfWeek: weekdays ? { in: weekdays } : undefined,
          },
        },
      },
      include: {
        supportedStreams: true,
        supportedContainers: true,
        availableSlots: {
          where: {
            dayOfWeek: weekdays ? { in: weekdays } : undefined,
          },
        },
      },
    });
    return res;
  }
}
