import { Provide } from '@midwayjs/core';
import * as fs from 'fs';
import * as path from 'path';

@Provide()
export class ImageService {
  private imagePath = path.resolve(__dirname, '../../uploads');

  //const file = files[0];
  //const uploadDir = path.join(__dirname, '../../uploads');
  //const filePath = path.join(uploadDir, file.filename);

  //fs.renameSync(file.data, filePath);
  async uploadImage(files: any[], index: number): Promise<Array<number>> {
    const imageIndex: Array<number> = [];
    files.forEach(file => {
      index += 1;
      const extname = path.extname(file.data);
      const storePath = path.join(this.imagePath, `${index}${extname}`);
      fs.renameSync(file.data, storePath);
      imageIndex.push(index);
    });
    return imageIndex;
  }
}
