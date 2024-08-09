import { Provide } from '@midwayjs/core';
import * as path from 'path';
import * as fs from 'fs';

@Provide()
export class UserService {
  private dataPath = path.resolve(__dirname, '../data/Users.json');

  async updateUserData(id: number, data: any) {
    const userData = await fs.promises.readFile(this.dataPath, 'utf-8');
    let items = JSON.parse(userData);
    const index = items.findIndex(item => item.id == id);
    items[index].profile.name = data.name;
    items[index].profile.intro = data.intro;
    items[index].profile.avator = data.avator;
    await fs.promises.writeFile(this.dataPath, JSON.stringify(items));
  }

  async getUserData(id: number) {
    const userData = await fs.promises.readFile(this.dataPath, 'utf-8');
    const items = JSON.parse(userData);
    const index = items.findIndex(item => item.id == id);
    return items[index];
  }
}
