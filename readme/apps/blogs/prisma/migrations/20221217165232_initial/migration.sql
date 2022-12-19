/*
  Warnings:

  - You are about to drop the column `originPostCreationDate` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `postCreationDate` on the `Post` table. All the data in the column will be lost.
  - Added the required column `publishDate` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "originPostCreationDate",
DROP COLUMN "postCreationDate",
ADD COLUMN     "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "publishDate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "likeCount" SET DEFAULT 0,
ALTER COLUMN "likeUsers" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "name" SET DEFAULT '',
ALTER COLUMN "videoLink" SET DEFAULT '',
ALTER COLUMN "announceText" SET DEFAULT '',
ALTER COLUMN "text" SET DEFAULT '',
ALTER COLUMN "author" SET DEFAULT '',
ALTER COLUMN "photo" SET DEFAULT '',
ALTER COLUMN "link" SET DEFAULT '',
ALTER COLUMN "tags" SET DEFAULT ARRAY[]::TEXT[];
