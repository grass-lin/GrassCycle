import { Provide } from '@midwayjs/core';
import * as fs from 'fs';
import * as path from 'path';

@Provide()
export class ImageService {
  private imagePath = path.resolve(__dirname, '../../uploads');
  private countFilePath = path.resolve(__dirname, '../data/Images.json');
  private imageCount: number = -1;

  async uploadImage(files: any[]): Promise<Array<string>> {
    if (this.imageCount === -1) {
      const data = await fs.promises.readFile(this.countFilePath, 'utf-8');
      const item = JSON.parse(data);
      this.imageCount = item.count;
    }

    const imageIndex: Array<string> = [];
    files.forEach(file => {
      this.imageCount += 1;
      const extname = path.extname(file.data);
      const fileName = `${this.imageCount}${extname}`;
      const storePath = path.join(this.imagePath, fileName);
      fs.renameSync(file.data, storePath);
      imageIndex.push(fileName);
    });

    if (files.length) {
      this.imageCount += imageIndex.length;
      await fs.promises.writeFile(
        this.countFilePath,
        JSON.stringify({ count: this.imageCount })
      );
    }

    return imageIndex;
  }
}
