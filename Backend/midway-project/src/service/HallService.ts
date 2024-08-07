import { Provide } from '@midwayjs/core';
import * as fs from 'fs';
import * as path from 'path';
//import { IUserOptions } from '../interface';

@Provide()
export class HallService {
  private dataPath = path.resolve(__dirname, '../data/Cycles.json');

  async getHallData() {
    const data = await fs.promises.readFile(this.dataPath, 'utf-8');
    const items = JSON.parse(data);
    return items;
  }
}
