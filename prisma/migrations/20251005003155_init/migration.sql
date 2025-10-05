-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analises_credito" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nomeProprietario" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "areaPropria" DOUBLE PRECISION NOT NULL,
    "areaArrendada" DOUBLE PRECISION NOT NULL,
    "talhoes" JSONB NOT NULL,
    "custos" JSONB NOT NULL,
    "dividas" JSONB NOT NULL,
    "resultados" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "analises_credito_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "analises_credito_userId_idx" ON "analises_credito"("userId");

-- CreateIndex
CREATE INDEX "analises_credito_cpf_idx" ON "analises_credito"("cpf");

-- CreateIndex
CREATE INDEX "analises_credito_createdAt_idx" ON "analises_credito"("createdAt");

-- AddForeignKey
ALTER TABLE "analises_credito" ADD CONSTRAINT "analises_credito_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
