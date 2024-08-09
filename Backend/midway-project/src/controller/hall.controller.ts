import {
  Inject,
  Controller,
  Get,
  Query,
  Post,
  Body,
  ALL,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { CycleService } from '../service/CycleService';

@Controller('/hall')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  cycleService: CycleService;

  @Get('/cycle')
  async getPost(@Query('cycleID') cycleID: number) {
    const postData = await this.cycleService.getPosts(cycleID);
    return postData;
  }

  @Post('/join')
  async postUserJoin(@Query('cycleID') cycleID, @Body(ALL) body: any) {
    const { userID } = body;
  }
}
