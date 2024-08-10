import {
  Inject,
  Controller,
  Query,
  Post,
  Body,
  ALL,
  Del,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { HallService } from '../service/HallService';

@Controller('/hall')
export class HallController {
  @Inject()
  ctx: Context;

  @Inject()
  hallService: HallService;

  @Post('/join')
  async postUserJoin(@Query('cycleID') cycleKey, @Body(ALL) body: any) {
    const { userID } = body;
    this.hallService.handleJoin(true, cycleKey, userID);
  }
  @Del('/join')
  async deleteUserJoin(@Query('cycleID') cycleKey, @Body(ALL) body: any) {
    const { userID } = body;
    this.hallService.handleJoin(false, cycleKey, userID);
  }
}
