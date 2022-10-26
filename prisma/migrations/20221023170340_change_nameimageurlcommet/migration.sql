/*
  Warnings:

  - You are about to drop the column `imgUrl` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "imgUrl",
ADD COLUMN     "imageUrl" TEXT;
