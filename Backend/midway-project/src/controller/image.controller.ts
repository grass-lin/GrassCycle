import { Controller, Get, Query, Inject } from '@midwayjs/core';
import { ParameterizedContext } from 'koa';
import * as path from 'path';
import * as send from 'koa-send';

@Controller('/images')
export class ImageController {
  private imagePath = path.resolve(__dirname, '../../uploads');
  @Inject()
  ctx: ParameterizedContext;
  @Get('')
  async getImage(@Query('imageName') imageName: string) {
    await send(this.ctx, imageName, { root: this.imagePath });
  }
}
