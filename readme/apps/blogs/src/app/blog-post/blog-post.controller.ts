import { Controller, Get, Post, Patch, Delete, Param, ParseIntPipe, Body, Query, UsePipes, UseGuards, Request, HttpStatus } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JoiValidationPipe } from "../pipes/joi-validation.pipe";
import { ParsePostQueryPipe } from "../pipes/parse-post-query.pipe";
import { BlogPostService } from "./blog-post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { JwtAuthenticationGuard } from "./guards/jwt-authentication.guard";
import { PostQuery } from "./query/post.query";
import { createPostValidationScheme } from "./validation-scheme/create-post.scheme";
import { postQueryValidationScheme } from "./validation-scheme/post-query.scheme";
import { updatePostValidationScheme } from "./validation-scheme/update-post.scheme";


@Controller('posts')
@ApiTags('BlogPost')
export class BlogPostController{
  constructor(
    private readonly blogPostService: BlogPostService
  ){}

  @Get('/')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The post has been successfully founded.'
  })
  @UsePipes(new JoiValidationPipe<PostQuery>(postQueryValidationScheme))
  @UsePipes(new ParsePostQueryPipe())
  async index(@Query() query : PostQuery) {
    const posts = await this.blogPostService.getPosts({...query});

    return posts
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The post has been successfully founded.'
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    const post  = await this.blogPostService.getPost(id)
    return post;
  }

  @Post('/')
  @ApiBody({
    type: CreatePostDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.'
  })
  @UseGuards(JwtAuthenticationGuard)
  @UsePipes(new JoiValidationPipe<CreatePostDto>(createPostValidationScheme))
  async createPost(@Request() req,  @Body() dto: CreatePostDto) {
    const post = await this.blogPostService.createPost({...dto, userId: req.user._id});

    return post;
  }

  @Patch('/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The post has been successfully updated.'
  })
  @UseGuards(JwtAuthenticationGuard)
  @UsePipes(new JoiValidationPipe<UpdatePostDto>(updatePostValidationScheme))
  async updatePost(@Body() dto: UpdatePostDto, @Param('id', ParseIntPipe) id: number) {
    const post = await this.blogPostService.updatePost(id, dto);

    return post;
  }

  @Delete('/:id')
  @UseGuards(JwtAuthenticationGuard)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The post has been successfully deleted.'
  })
  async deletePost(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.blogPostService.deletePost(id);
  }
}
