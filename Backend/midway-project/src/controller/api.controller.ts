import {
  ALL,
  Controller,
  Post,
  Inject,
  Fields,
  Files,
  Query,
} from '@midwayjs/core';
//import * as fs from 'fs';
//import * as path from 'path';
import { ImageService } from '../service/ImageService';
import { UserService } from '../service/UserService';

@Controller('/api')
export class APIController {
  //private countFilePath = path.resolve(__dirname, '../data/Images.json');
  //private imageCount: number = -1;
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
    const upload = await this.imageService.uploadImage(files);

    let avatorName: string;
    if (upload.length) {
      avatorName = upload[0];
    } else {
      avatorName = 'false';
    }
    this.userService.updateUserData(userID, {
      ...formData,
      avator: avatorName,
    });
  }
}
