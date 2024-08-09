import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  ALL,
  Query,
} from '@midwayjs/core';
import { HallService } from '../service/HallService';
import { AuthService } from '../service/AuthService';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/UserService';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Inject()
  hallService: HallService;
  @Inject()
  authService: AuthService;
  @Inject()
  userService: UserService;

  @Get('/user')
  async home(@Query('userID') userID): Promise<any> {
    const val = await this.userService.getUserData(userID);
    return val;
  }
  @Get('/hall')
  async hall(): Promise<Object> {
    const hallData = await this.hallService.getHallData();
    return hallData;
  }

  @Post('/login')
  async login(@Body(ALL) body: any): Promise<Object> {
    const { username, password } = body;
    const res = await this.authService.checkLoginInfo(username, password);
    return res;
  }
}
