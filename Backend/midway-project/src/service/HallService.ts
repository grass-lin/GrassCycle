import { Provide } from '@midwayjs/core';
import * as fs from 'fs';
import * as path from 'path';
//import { IUserOptions } from '../interface';

@Provide()
export class HallService {
  private cyclePath = path.resolve(__dirname, '../data/Cycles.json');
  private userPath = path.resolve(__dirname, '../data/Users.json');

  async getHallData() {
    const data = await fs.promises.readFile(this.cyclePath, 'utf-8');
    const items = JSON.parse(data);
    return items;
  }

  async handleJoin(type: boolean, cycleKey: number, userID: number) {
    const cycleData = await fs.promises.readFile(this.cyclePath, 'utf-8');
    const userData = await fs.promises.readFile(this.userPath, 'utf-8');
    const cycleItems = JSON.parse(cycleData);
    const userItems = JSON.parse(userData);

    const cycleIndex = cycleItems.findIndex(item => item.key == cycleKey);
    const userIndex = userItems.findIndex(item => item.id == userID);

    if (type) {
      cycleItems[cycleIndex].funs.push(userID);
      userItems[userIndex].join.push(cycleKey);
      cycleItems[cycleIndex].size += 1;
    } else {
      const funsListIndex = cycleItems[cycleIndex].funs.indexOf(userID);
      const joinListIndex = userItems[userIndex].join.indexOf(cycleKey);
      cycleItems[cycleIndex].funs.splice(funsListIndex, 1);
      userItems[userIndex].join.splice(joinListIndex, 1);
      cycleItems[cycleIndex].size -= 1;
    }

    await fs.promises.writeFile(this.cyclePath, JSON.stringify(cycleItems));
    await fs.promises.writeFile(this.userPath, JSON.stringify(userItems));
  }
}
