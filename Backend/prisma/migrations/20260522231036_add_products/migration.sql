-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "precioUnitario" DECIMAL(10,2) NOT NULL,
    "stock" INTEGER NOT NULL,
    "id_categoria" INTEGER NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
