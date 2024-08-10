import {
  Inject,
  Controller,
  Get,
  Query,
  Post,
  Body,
  ALL,
  Del,
  Files,
  Fields,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { CycleService } from '../service/CycleService';
import { ImageService } from '../service/ImageService';

@Controller('/cycle')
export class CycleController {
  @Inject()
  ctx: Context;

  @Inject()
  cycleService: CycleService;

  @Inject()
  imageService: ImageService;

  @Get('/')
  async getPost(@Query('cycleID') cycleKey: number) {
    const postData = await this.cycleService.getPosts(cycleKey);
    return postData;
  }

  @Post('/')
  async postNew(
    @Query('cycleID') cycleKey: number,
    @Fields(ALL) body: any,
    @Files() files: any
  ) {
    const index = await this.imageService.uploadImage(files);

    this.cycleService.newPost(cycleKey, body, index);
  }
  // true means post
  // false means delete
  @Post('/like')
  async postUserLike(
    @Query('cycleID') cycleKey,
    @Query('postKey') postKey,
    @Body(ALL) formData: any
  ) {
    console.log(formData);
    const { userID } = formData;
    this.cycleService.handleLike(true, cycleKey, postKey, userID);
  }

  @Del('/like')
  async deleteUserLike(
    @Query('cycleID') cycleKey,
    @Query('postKey') postKey,
    @Body(ALL) body: any
  ) {
    const { userID } = body;
    this.cycleService.handleLike(false, cycleKey, postKey, userID);
  }
}
