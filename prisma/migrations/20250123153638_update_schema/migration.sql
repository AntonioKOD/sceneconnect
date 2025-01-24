/*
  Warnings:

  - The `status` column on the `Pledge` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Creator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SceneCreators` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `scenes` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'CREATOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "SceneStatus" AS ENUM ('IDEA', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "PledgeStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELED');

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_sceneId_fkey";

-- DropForeignKey
ALTER TABLE "Pledge" DROP CONSTRAINT "Pledge_sceneId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_sceneId_fkey";

-- DropForeignKey
ALTER TABLE "_SceneCreators" DROP CONSTRAINT "_SceneCreators_A_fkey";

-- DropForeignKey
ALTER TABLE "_SceneCreators" DROP CONSTRAINT "_SceneCreators_B_fkey";

-- DropForeignKey
ALTER TABLE "scenes" DROP CONSTRAINT "scenes_creatorId_fkey";

-- AlterTable
ALTER TABLE "Pledge" DROP COLUMN "status",
ADD COLUMN     "status" "PledgeStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ALTER COLUMN "email" SET NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Creator";

-- DropTable
DROP TABLE "_SceneCreators";

-- DropTable
DROP TABLE "scenes";

-- CreateTable
CREATE TABLE "Scene" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "SceneStatus" NOT NULL DEFAULT 'IDEA',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fundingGoal" DOUBLE PRECISION NOT NULL,
    "currentFunding" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "nicheTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "voteCount" INTEGER NOT NULL DEFAULT 0,
    "videoUrl" TEXT,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "Scene_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Scene" ADD CONSTRAINT "Scene_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pledge" ADD CONSTRAINT "Pledge_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "Scene"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "Scene"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "Scene"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
