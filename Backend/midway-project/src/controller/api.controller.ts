import { Controller, Post, Files, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import * as fs from 'fs';
import * as path from 'path';
import { ImageService } from '../service/ImageService';

@Controller('/api')
export class APIController {
  private countFilePath = path.resolve(__dirname, '../data/Images.json');
  private imageCount: number = -1;
  @Inject()
  imageService: ImageService;

  @Post('/upload')
  async upload(@Files() files, ctx: Context) {
    if (this.imageCount == -1) {
      const data = await fs.promises.readFile(this.countFilePath, 'utf-8');
      const item = JSON.parse(data);
      this.imageCount = item.count;
    }
    this.imageCount += (
      await this.imageService.uploadImage(files, this.imageCount)
    ).length;
    await fs.promises.writeFile(
      this.countFilePath,
      JSON.stringify({ count: this.imageCount })
    );
  }
}
