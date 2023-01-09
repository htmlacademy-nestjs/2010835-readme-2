import { Controller, Get } from '@nestjs/common';

@Controller('comments')
export class CommentController {

  @Get('/index')
  async index(){
    return {};
  }
}
