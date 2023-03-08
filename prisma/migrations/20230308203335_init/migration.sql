-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateTable
CREATE TABLE "providers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postal_code_ranges" (
    "id" SERIAL NOT NULL,
    "start" INTEGER NOT NULL,
    "end" INTEGER NOT NULL,

    CONSTRAINT "postal_code_ranges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "slots" (
    "id" SERIAL NOT NULL,
    "dayOfWeek" "DayOfWeek" NOT NULL,
    "timeStart" TEXT NOT NULL DEFAULT '09:00:00',
    "timeEnd" TEXT NOT NULL DEFAULT '17:00:00',

    CONSTRAINT "slots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "postalCode" INTEGER,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "containers" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "subCategory" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "sizeUnit" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "placementType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "containers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "streams" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "textColor" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "name" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "detailsUrl" TEXT,

    CONSTRAINT "streams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProviderToStream" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProviderToSlot" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PostalCodeRangeToProvider" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ContainerToProvider" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ProviderToStream_AB_unique" ON "_ProviderToStream"("A", "B");

-- CreateIndex
CREATE INDEX "_ProviderToStream_B_index" ON "_ProviderToStream"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProviderToSlot_AB_unique" ON "_ProviderToSlot"("A", "B");

-- CreateIndex
CREATE INDEX "_ProviderToSlot_B_index" ON "_ProviderToSlot"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PostalCodeRangeToProvider_AB_unique" ON "_PostalCodeRangeToProvider"("A", "B");

-- CreateIndex
CREATE INDEX "_PostalCodeRangeToProvider_B_index" ON "_PostalCodeRangeToProvider"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ContainerToProvider_AB_unique" ON "_ContainerToProvider"("A", "B");

-- CreateIndex
CREATE INDEX "_ContainerToProvider_B_index" ON "_ContainerToProvider"("B");

-- AddForeignKey
ALTER TABLE "_ProviderToStream" ADD CONSTRAINT "_ProviderToStream_A_fkey" FOREIGN KEY ("A") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProviderToStream" ADD CONSTRAINT "_ProviderToStream_B_fkey" FOREIGN KEY ("B") REFERENCES "streams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProviderToSlot" ADD CONSTRAINT "_ProviderToSlot_A_fkey" FOREIGN KEY ("A") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProviderToSlot" ADD CONSTRAINT "_ProviderToSlot_B_fkey" FOREIGN KEY ("B") REFERENCES "slots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostalCodeRangeToProvider" ADD CONSTRAINT "_PostalCodeRangeToProvider_A_fkey" FOREIGN KEY ("A") REFERENCES "postal_code_ranges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostalCodeRangeToProvider" ADD CONSTRAINT "_PostalCodeRangeToProvider_B_fkey" FOREIGN KEY ("B") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContainerToProvider" ADD CONSTRAINT "_ContainerToProvider_A_fkey" FOREIGN KEY ("A") REFERENCES "containers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContainerToProvider" ADD CONSTRAINT "_ContainerToProvider_B_fkey" FOREIGN KEY ("B") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
