import { Provide } from '@midwayjs/core';
import * as fs from 'fs';
import * as path from 'path';

@Provide()
export class ImageService {
  private imagePath = path.resolve(__dirname, '../../uploads');

  async uploadImage(files: any[], index: number): Promise<Array<string>> {
    const imageIndex: Array<string> = [];
    files.forEach(file => {
      index += 1;
      const extname = path.extname(file.data);
      const fileName = `${index}${extname}`;
      const storePath = path.join(this.imagePath, fileName);
      fs.renameSync(file.data, storePath);
      imageIndex.push(fileName);
    });
    return imageIndex;
  }
}
