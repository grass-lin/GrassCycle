import {
  Inject,
  Controller,
  Query,
  Post,
  Body,
  ALL,
  Del,
  Get,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { HallService } from '../service/HallService';
import { CycleService } from '../service/CycleService';

@Controller('/hall')
export class HallController {
  @Inject()
  ctx: Context;

  @Inject()
  hallService: HallService;

  @Inject()
  cycleService: CycleService;

  @Get('/')
  async getHallData(): Promise<Object> {
    const hallData = await this.hallService.getHallData();
    return hallData;
  }

  @Post('/')
  async postNewCycle(@Body(ALL) body: any) {
    const newKey = await this.hallService.postNewCycle(body);
    await this.cycleService.postNewCycle(newKey);
  }

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
