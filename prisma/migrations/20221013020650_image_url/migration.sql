/*
  Warnings:

  - You are about to drop the column `imgageUrl` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "imgageUrl",
DROP COLUMN "updatedAt",
ADD COLUMN     "imageUrl" TEXT;
