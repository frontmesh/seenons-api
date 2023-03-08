import { PrismaClient, DayOfWeek } from '@prisma/client';

import * as streams from './data/streams.json';
import * as containers from './data/containers.json';

const prisma = new PrismaClient();

async function main() {
  if (await prisma.stream.count() === 0) {
    await prisma.stream.createMany({
      data: streams.map((stream) => ({
        id: stream.stream_product_id,
        type: stream.type,
        image: stream.image,
        detailsUrl: stream.details_url,
        textColor: stream.text_color,
        backgroundColor: stream.background_color,
        name: stream.name,
        description: stream.description,
      })),
    });
  }

  if (await prisma.container.count() === 0) {
    await prisma.container.createMany({
      data: containers.map((container) => ({
        id: container.id,
        category: container.category,
        size: container.size,
        sizeUnit: container.size_unit,
        subCategory: container.sub_category,
        imageUrl: container.image_url,
        placementType: container.placement_type,
        createdAt: container.created_at,
        updatedAt: container.updated_at,
      })),
    });
  }

  // Seed PostalCodeRange data
  const postalCodeRanges = [
    { start: 1500, end: 2000 },
    { start: 1000, end: 1499 },
    { start: 1000, end: 1099 },
  ];

  if (await prisma.postalCodeRange.count() === 0) {
    for (const [index, postalCodeRange] of postalCodeRanges.entries()) {
      await prisma.postalCodeRange.create({
        data: {
          id: index + 1,
          ...postalCodeRange,
        }
      });
    }
  }

  // Seed Slot data
  const slots = [
    { dayOfWeek: DayOfWeek.MONDAY, timeStart: '09:00:00', timeEnd: '17:00:00' },
    {
      dayOfWeek: DayOfWeek.TUESDAY,
      timeStart: '09:00:00',
      timeEnd: '17:00:00',
    },
    {
      dayOfWeek: DayOfWeek.WEDNESDAY,
      timeStart: '09:00:00',
      timeEnd: '17:00:00',
    },
    {
      dayOfWeek: DayOfWeek.THURSDAY,
      timeStart: '09:00:00',
      timeEnd: '17:00:00',
    },
    { dayOfWeek: DayOfWeek.FRIDAY, timeStart: '09:00:00', timeEnd: '17:00:00' },
  ];

  if (await prisma.slot.count() === 0) {
    for (const [index, slot] of slots.entries()) {
      await prisma.slot.create({
        data: { id: index + 1, ...slot },
      });
    }
  }

  // Seed LogisticsProvider data
  const providers = [
    {
      name: 'Retransport',
      supportedStreams: {
        connect: [{ id: 1 }, { id: 3 }, { id: 4 }]
      },
      supportedContainers: {
        connect: [{ id: 1 }, { id: 2 }],
      },
      postalCodeRanges: {
        connect: [{ id: 1 }],
      },
      availableSlots: {
        connect: [{ id: 1 }, { id: 2 }, { id: 4 }, { id: 5 }],
      },
    },
    {
      name: 'Retransport',
      supportedStreams: {
        connect: [{ id: 1 }, { id: 4 }, { id: 5 }, { id: 6 }]
      },
      supportedContainers: {
        connect: [{ id: 1 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }]
      },
      postalCodeRanges: {
        connect: [{ id: 2 }],
      },
      availableSlots: {
        connect: [{ id: 1 }, { id: 2 }, { id: 4 }, { id: 5 }],
      },
    },
    {
      name: 'GreenCollect',
      supportedStreams: {
        connect: [{ id: 6 }, { id: 7 }, { id: 9 }, { id: 10 }],
      },
      supportedContainers: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
      postalCodeRanges: {
        connect: [{ id: 3 }],
      },
      availableSlots: {
        connect: [{ id: 1 }, { id: 3 }],
      },
    },
  ];

  if (await prisma.provider.count() === 0) {
    for (const [index, provider] of providers.entries()) {
      await prisma.provider.create({
        data: { id: index + 1, ...provider },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
