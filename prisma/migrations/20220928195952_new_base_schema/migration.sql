/*
  Warnings:

  - You are about to drop the column `followedUserId` on the `Follow` table. All the data in the column will be lost.
  - You are about to drop the column `followedUserPfp` on the `Follow` table. All the data in the column will be lost.
  - You are about to drop the column `followedUsername` on the `Follow` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Follow` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `img` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pfp` on the `User` table. All the data in the column will be lost.
  - Added the required column `followedById` to the `Follow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followingId` to the `Follow` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_userId_fkey";

-- AlterTable
ALTER TABLE "Follow" DROP COLUMN "followedUserId",
DROP COLUMN "followedUserPfp",
DROP COLUMN "followedUsername",
DROP COLUMN "userId",
ADD COLUMN     "followedById" INTEGER NOT NULL,
ADD COLUMN     "followingId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "content",
DROP COLUMN "img",
ADD COLUMN     "imgageUrl" TEXT,
ADD COLUMN     "tags" TEXT,
ADD COLUMN     "text" TEXT,
ADD COLUMN     "videoUrl" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "pfp";

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "username" TEXT,
    "pfp" TEXT,
    "biography" TEXT,
    "workingAt" TEXT,
    "location" TEXT,
    "linkedIn" TEXT,
    "twitter" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "text" TEXT,
    "imgUrl" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Code" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "theme" TEXT,
    "options" TEXT,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "Code_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_likedPosts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_likedComments" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Code_postId_key" ON "Code"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "_likedPosts_AB_unique" ON "_likedPosts"("A", "B");

-- CreateIndex
CREATE INDEX "_likedPosts_B_index" ON "_likedPosts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_likedComments_AB_unique" ON "_likedComments"("A", "B");

-- CreateIndex
CREATE INDEX "_likedComments_B_index" ON "_likedComments"("B");

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followedById_fkey" FOREIGN KEY ("followedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Code" ADD CONSTRAINT "Code_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likedPosts" ADD CONSTRAINT "_likedPosts_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likedPosts" ADD CONSTRAINT "_likedPosts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likedComments" ADD CONSTRAINT "_likedComments_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likedComments" ADD CONSTRAINT "_likedComments_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
