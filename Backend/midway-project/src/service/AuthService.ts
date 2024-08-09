import { Provide } from '@midwayjs/core';
import * as fs from 'fs';
import * as path from 'path';

@Provide()
export class AuthService {
  private dataPath = path.resolve(__dirname, '../data/Users.json');

  async checkLoginInfo(username: string, password: string) {
    const data = await fs.promises.readFile(this.dataPath, 'utf-8');
    const items = JSON.parse(data);
    const index = items.findIndex(item => item.username === username);
    const length = items.length;
    if (index != -1 && items[index].password === password) {
      return {
        ...items[index],
        status: 0,
      };
    } else if (index === -1) {
      const newUser = {
        id: length,
        username: `${username}`,
        password: `${password}`,
        profile: {
          name: `圈子用户${length}`,
          intro: '这个人很懒, 什么都没有写',
        },
        like: [],
        join: [],
        post: [],
        comment: [],
      };
      items.push(newUser);
      await fs.promises.writeFile(
        this.dataPath,
        JSON.stringify(items, null, 2)
      );
      return {
        ...newUser,
        status: 1,
      };
    } else if (items[index].password != password) {
      return { status: 2 };
    }
  }
}
