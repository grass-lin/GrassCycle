import { Inject, Controller, Get, Query } from '@midwayjs/core';
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
}
