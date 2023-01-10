import { Controller, Get, Post, Patch, Delete, Param, ParseIntPipe, Body, Query, UsePipes, UseGuards, Request } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JoiValidationPipe } from "../pipes/joi-validation.pipe";
import { BlogPostService } from "./blog-post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { JwtAuthenticationGuard } from "./guards/jwt-authentication.guard";
import { PostQuery } from "./query/post.query";
import { createPostValidationScheme } from "./validation-scheme/create-post.scheme";
import { updatePostValidationScheme } from "./validation-scheme/update-post.scheme";


@Controller('posts')
@ApiTags('BlogPost')
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
  @UseGuards(JwtAuthenticationGuard)
  @UsePipes(new JoiValidationPipe<CreatePostDto>(createPostValidationScheme))
  async createPost(@Request() req,  @Body() dto: CreatePostDto) {
    const post = await this.blogPostService.createPost({...dto, userId: req.user._id});

    return post;
  }

  @Patch('/:id')
  @UseGuards(JwtAuthenticationGuard)
  @UsePipes(new JoiValidationPipe<UpdatePostDto>(updatePostValidationScheme))
  async updatePost(@Body() dto: UpdatePostDto, @Param('id', ParseIntPipe) id: number) {
    const post = await this.blogPostService.updatePost(id, dto);

    return post;
  }

  @Delete('/:id')
  @UseGuards(JwtAuthenticationGuard)
  async deletePost(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.blogPostService.deletePost(id);
  }
}
