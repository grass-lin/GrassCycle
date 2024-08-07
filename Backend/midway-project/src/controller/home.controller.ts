import { Controller, Get, Inject } from '@midwayjs/core';
import { HallService } from '../service/HallService';
import { Context } from '@midwayjs/koa';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Inject()
  hallService: HallService;

  @Get('')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }
  @Get('/hall')
  async hall(): Promise<Object> {
    const hallData = await this.hallService.getHallData();
    return hallData;
  }
}
