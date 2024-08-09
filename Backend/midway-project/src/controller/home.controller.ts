import { Body, Controller, Get, Inject, Post, ALL } from '@midwayjs/core';
import { HallService } from '../service/HallService';
import { AuthService } from '../service/AuthService';
import { Context } from '@midwayjs/koa';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Inject()
  hallService: HallService;
  @Inject()
  authService: AuthService;

  @Get('')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }
  @Get('/hall')
  async hall(): Promise<Object> {
    const hallData = await this.hallService.getHallData();
    return hallData;
  }

  @Post('/login')
  async login(@Body(ALL) body: any): Promise<Object> {
    const { username, password } = body;
    console.log(body);
    const res = await this.authService.checkLoginInfo(username, password);
    return res;
  }
}
