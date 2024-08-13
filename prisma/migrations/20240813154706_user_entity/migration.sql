-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'BOUTIQUIER';

-- CreateTable
CREATE TABLE "Dette" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "montant" DOUBLE PRECISION NOT NULL,
    "montantVerser" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "montantDue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "clientId" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dette_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paiement" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "montant" INTEGER NOT NULL,
    "detteId" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Paiement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticlesOnDettes" (
    "detteId" INTEGER NOT NULL,
    "articleId" INTEGER NOT NULL,
    "prixVente" DOUBLE PRECISION NOT NULL,
    "qteVente" DOUBLE PRECISION NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArticlesOnDettes_pkey" PRIMARY KEY ("detteId","articleId")
);

-- CreateIndex
CREATE INDEX "Dette_clientId_idx" ON "Dette"("clientId");

-- CreateIndex
CREATE INDEX "Paiement_detteId_idx" ON "Paiement"("detteId");

-- AddForeignKey
ALTER TABLE "Dette" ADD CONSTRAINT "Dette_clientId_fk" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paiement" ADD CONSTRAINT "Paiement_detteId_fk" FOREIGN KEY ("detteId") REFERENCES "Dette"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticlesOnDettes" ADD CONSTRAINT "ArticlesOnDettes_detteId_fkey" FOREIGN KEY ("detteId") REFERENCES "Dette"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticlesOnDettes" ADD CONSTRAINT "ArticlesOnDettes_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
