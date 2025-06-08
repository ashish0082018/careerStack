/*
  Warnings:

  - You are about to drop the column `authorId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `clicks` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[customUrl]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bio` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobTitle` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `socialLinks` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_authorId_fkey";

-- DropIndex
DROP INDEX "Profile_slug_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "authorId",
DROP COLUMN "clicks",
DROP COLUMN "image",
DROP COLUMN "link",
DROP COLUMN "message",
DROP COLUMN "slug",
ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "customUrl" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "jobTitle" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "private" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "profileViews" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "showEmail" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "showLocation" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "socialLinks" JSONB NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_customUrl_key" ON "Profile"("customUrl");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
