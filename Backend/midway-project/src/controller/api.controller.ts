import {
  ALL,
  Controller,
  Post,
  Inject,
  Fields,
  Files,
  Query,
} from '@midwayjs/core';
import * as fs from 'fs';
import * as path from 'path';
import { ImageService } from '../service/ImageService';
import { UserService } from '../service/UserService';

@Controller('/api')
export class APIController {
  private countFilePath = path.resolve(__dirname, '../data/Images.json');
  private imageCount: number = -1;
  @Inject()
  imageService: ImageService;
  @Inject()
  userService: UserService;

  @Post('/update')
  async upload(
    @Fields(ALL) formData: any,
    @Files() files: any,
    @Query('userID') userID
  ) {
    if (this.imageCount == -1) {
      const data = await fs.promises.readFile(this.countFilePath, 'utf-8');
      const item = JSON.parse(data);
      this.imageCount = item.count;
    }

    const upload = await this.imageService.uploadImage(files, this.imageCount);
    if (files.length) {
      this.imageCount += upload.length;
      await fs.promises.writeFile(
        this.countFilePath,
        JSON.stringify({ count: this.imageCount })
      );
    }
    this.userService.updateUserData(userID, { ...formData, avator: upload[0] });
  }
}
