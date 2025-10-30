-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN "publicationId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_publicationId_key" ON "BlogPost"("publicationId");


