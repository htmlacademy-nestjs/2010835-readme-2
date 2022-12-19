import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BlogPostController } from './blog-post/blog-post.controller';
import { BlogPostRepository } from './blog-post/blog-post.repository';
import { BlogPostService } from './blog-post/blog-post.service';

@Module({
  imports: [],
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostRepository, PrismaService],
})
export class AppModule {}
