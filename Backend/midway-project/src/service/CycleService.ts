import { Provide } from '@midwayjs/core';
import * as fs from 'fs';
import * as path from 'path';

@Provide()
export class CycleService {
  private data: Array<any>;

  constructor() {
    // 指定数据文件夹的路径
    const dataDir = path.join(__dirname, '../data/Posts');

    // 获取数据文件夹中所有的 JSON 文件名
    const files = fs
      .readdirSync(dataDir)
      .filter(file => file.endsWith('.json'));

    // 解析所有 JSON 文件并存储到数组中
    this.data = files.map(file => {
      const filePath = path.join(dataDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(fileContent);
    });
  }

  async getPosts(cycleID: number) {
    return this.data[cycleID];
  }
}
