import { Provide } from '@midwayjs/core';
import * as path from 'path';
import * as fs from 'fs';

@Provide()
export class UserService {
  private dataPath = path.join(process.cwd(), '../data/Users.json');

  async updateUserData(id: number, data: any) {
    id = Number(id);
    const userData = await fs.promises.readFile(this.dataPath, 'utf-8');
    let items = JSON.parse(userData);
    const index = items.findIndex(item => item.id == id);

    if (data.avatar == 'false') {
      data.avatar = items[index].profile.avatar;
    }
    items[index].profile.name = data.name;
    items[index].profile.intro = data.intro;
    items[index].profile.avatar = data.avatar;
    await fs.promises.writeFile(this.dataPath, JSON.stringify(items));
  }

  async getUserData(id: number) {
    id = Number(id);
    const userData = await fs.promises.readFile(this.dataPath, 'utf-8');
    const items = JSON.parse(userData);
    const index = items.findIndex(item => item.id == id);
    return items[index];
  }
}
