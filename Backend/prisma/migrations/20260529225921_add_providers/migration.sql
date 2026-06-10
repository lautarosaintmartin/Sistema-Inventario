-- AlterTable
ALTER TABLE "products" ADD COLUMN     "id_provider" INTEGER;

-- CreateTable
CREATE TABLE "providers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "providers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "providers_email_key" ON "providers"("email");

-- CreateIndex
CREATE INDEX "providers_id_idx" ON "providers"("id");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_id_provider_fkey" FOREIGN KEY ("id_provider") REFERENCES "providers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
