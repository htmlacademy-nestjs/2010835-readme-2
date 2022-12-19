import { Controller, Get, Post, Patch, Delete, Param, ParseIntPipe, Body } from "@nestjs/common";
import { BlogPostService } from "./blog-post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Controller('posts')
export class BlogPostController{
  constructor(
    private readonly blogPostService: BlogPostService
  ){}

  @Get('/')
  async index() {
    const posts = await this.blogPostService.getPosts();
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
