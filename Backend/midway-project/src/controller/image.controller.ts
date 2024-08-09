import { Controller, Get, Param, Inject } from '@midwayjs/core';
import { ParameterizedContext } from 'koa';
import * as path from 'path';
import * as send from 'koa-send';

@Controller('/images')
export class ImageController {
  @Inject()
  ctx: ParameterizedContext;
  @Get('/:imageName')
  async getImage(@Param('imageName') imageName: string) {
    const imagePath = path.resolve(__dirname, '../../uploads', imageName);
    await send(this.ctx, imagePath);
  }
}
