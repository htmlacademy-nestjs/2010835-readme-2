-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "originPostId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "originUserId" TEXT NOT NULL,
    "postCreationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "originPostCreationDate" TIMESTAMP(3) NOT NULL,
    "postType" TEXT NOT NULL,
    "postState" TEXT NOT NULL,
    "isRepost" BOOLEAN NOT NULL,
    "likeCount" INTEGER NOT NULL,
    "likeUsers" TEXT[],
    "name" TEXT NOT NULL,
    "videoLink" TEXT NOT NULL,
    "announceText" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
