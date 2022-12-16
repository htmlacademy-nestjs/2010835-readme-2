import { Controller, Get } from "@nestjs/common";
import { BlogPostService } from "./blog-post.service";

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
}
