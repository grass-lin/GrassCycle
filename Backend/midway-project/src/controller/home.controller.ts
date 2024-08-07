import { Controller, Get, Query } from '@midwayjs/core';

@Controller('/')
export class HomeController {
  @Get('')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }
  @Get('/post')
  async hall(@Query('postID') postID: number): Promise<Object> {
    const responseData = {
      id: postID,
      content: 'hello world',
    };
    return responseData;
  }
}
