import { Inject, Controller, Get, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { PostService } from '../service/user.service';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  postService: PostService;

  @Get('/get-post')
  async getPost(@Query('postID') postID: number) {
    const postData = await this.postService.getPostData(postID);
    return postData;
  }
}
