/*
  Warnings:

  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_id_categoria_fkey";

-- DropTable
DROP TABLE "Products";

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "precioUnitario" DECIMAL(10,2) NOT NULL,
    "stock" INTEGER NOT NULL,
    "id_categoria" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "products_id_idx" ON "products"("id");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
