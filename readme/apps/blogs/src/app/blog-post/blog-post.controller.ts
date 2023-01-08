import { Controller, Get, Post, Patch, Delete, Param, ParseIntPipe, Body, Query, UsePipes } from "@nestjs/common";
import { BlogPostService } from "./blog-post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostQuery } from "./query/post.query";

@Controller('posts')
export class BlogPostController{
  constructor(
    private readonly blogPostService: BlogPostService
  ){}

  @Get('/')
  async index(@Query() query : PostQuery) {
    const posts = await this.blogPostService.getPosts({
      limit: +query.limit,
      page: query.page,
      userId: query.userId,
      sortBy: query.sortBy ?? 'creationDate',
      sortDirection: query.sortDirection ?? 'asc',
      postType: query.postType,
      postTag: query.postTag,
    }as PostQuery);
    return posts;
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const post  = await this.blogPostService.getPost(id)
    return post;
  }

  @Post('/')
  async createPost(@Body() dto: CreatePostDto) {
    const post = await this.blogPostService.createPost(dto);

    return post;
  }

  @Patch('/:id')
  async updatePost(@Body() dto: UpdatePostDto, @Param('id', ParseIntPipe) id: number) {
    const post = await this.blogPostService.updatePost(id, dto);

    return post;
  }

  @Delete('/:id')
  async deletePost(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.blogPostService.deletePost(id);
  }
}
