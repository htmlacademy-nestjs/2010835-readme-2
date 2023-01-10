import { Controller, Delete, Get, Param, Body, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@readme/core';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentRdo } from './rdo/create-comment.rdo';
import { ShowCommentRdo } from './rdo/show-comment.rdo';
import { UpdateCommentRdo } from './rdo/update-comment.rdo';

@Controller('comments')
@ApiTags('Comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ){}

  @Get(':id')
  @ApiResponse({
    type: ShowCommentRdo,
    status: HttpStatus.OK,
    description: 'The comment has been successfully founded'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The comment not found'
  })
  async getByPostId(@Param('id', ParseIntPipe) id: number) : Promise<ShowCommentRdo>{
    const foundedComment = await this.commentService.findByPostId(id)

    return fillObject(ShowCommentRdo, foundedComment);
  }

  @Post('/')
  @ApiResponse({
    type: CreateCommentRdo,
    status: HttpStatus.CREATED,
    description: 'The new comment has been successfully created.'
  })
  async create(@Body() dto : CreateCommentDto) : Promise<CreateCommentRdo>{
    const createdComment = await this.commentService.create(dto);

    return fillObject(CreateCommentRdo, createdComment);
  }

  @Patch('/')
  @ApiResponse({
    type: UpdateCommentRdo,
    status: HttpStatus.OK,
    description: 'The comment has been successfully updated.'
  })
  async update(@Body() dto : UpdateCommentDto){
    const updatedComment = await this.commentService.updateById(dto);

    return fillObject(UpdateCommentRdo, updatedComment);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The comment has been successfully deleted.'
  })
  async delete(@Param('id', ParseIntPipe) id: number){
    this.commentService.deleteById(id);
  }
}
