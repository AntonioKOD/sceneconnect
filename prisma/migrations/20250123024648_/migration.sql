/*
  Warnings:

  - You are about to drop the `Actor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SceneActors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SceneActors" DROP CONSTRAINT "_SceneActors_A_fkey";

-- DropForeignKey
ALTER TABLE "_SceneActors" DROP CONSTRAINT "_SceneActors_B_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- DropTable
DROP TABLE "Actor";

-- DropTable
DROP TABLE "_SceneActors";

-- CreateTable
CREATE TABLE "Creator" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL,

    CONSTRAINT "Creator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SceneCreators" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SceneCreators_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SceneCreators_B_index" ON "_SceneCreators"("B");

-- AddForeignKey
ALTER TABLE "_SceneCreators" ADD CONSTRAINT "_SceneCreators_A_fkey" FOREIGN KEY ("A") REFERENCES "Creator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SceneCreators" ADD CONSTRAINT "_SceneCreators_B_fkey" FOREIGN KEY ("B") REFERENCES "scenes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
