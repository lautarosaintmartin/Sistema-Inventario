-- DropForeignKey
ALTER TABLE "Movement" DROP CONSTRAINT "Movement_productId_fkey";

-- AlterTable
ALTER TABLE "Movement" ALTER COLUMN "productId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
