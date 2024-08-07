import { Provide } from '@midwayjs/core';
import * as fs from 'fs';
import * as path from 'path';
//import { IUserOptions } from '../interface';

@Provide()
export class PostService {
  private dataPath = path.resolve(__dirname, '../data/posts.json');

  async getPostData(id: number) {
    const data = await fs.promises.readFile(this.dataPath, 'utf-8');
    const items = JSON.parse(data);
    return items.find(item => item.id === id);
  }
}
