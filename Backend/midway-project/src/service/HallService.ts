import { Provide } from '@midwayjs/core';
import * as fs from 'fs';
import * as path from 'path';
//import { IUserOptions } from '../interface';

@Provide()
export class HallService {
  private cyclePath = path.resolve(process.cwd(), '../data/Cycles.json');
  private userPath = path.resolve(process.cwd(), '../data/Users.json');

  async getHallData() {
    const data = await fs.promises.readFile(this.cyclePath, 'utf-8');
    const items = JSON.parse(data);
    return items;
  }

  async postNewCycle(body: any): Promise<number> {
    const cycleData = await fs.promises.readFile(this.cyclePath, 'utf-8');
    const cycleItems = JSON.parse(cycleData);
    const newKey = cycleItems.length + 1;
    const newCycle = {
      key: newKey,
      name: body.name,
      size: 0,
      description: body.description,
      member: [],
    };
    cycleItems.push(newCycle);

    await fs.promises.writeFile(this.cyclePath, JSON.stringify(cycleItems));
    return newKey;
  }
  async handleJoin(type: boolean, cycleKey: number, userID: number) {
    cycleKey = Number(cycleKey);
    userID = Number(userID);
    const cycleData = await fs.promises.readFile(this.cyclePath, 'utf-8');
    const userData = await fs.promises.readFile(this.userPath, 'utf-8');
    const cycleItems = JSON.parse(cycleData);
    const userItems = JSON.parse(userData);

    const cycleIndex = cycleItems.findIndex(item => item.key == cycleKey);
    const userIndex = userItems.findIndex(item => item.id == userID);

    if (type) {
      cycleItems[cycleIndex].member.push(userID);
      userItems[userIndex].join.push({
        cycleKey: cycleKey,
        name: cycleItems[cycleIndex].name,
      });
      cycleItems[cycleIndex].size += 1;
    } else {
      const memberListIndex = cycleItems[cycleIndex].member.indexOf(userID);
      const joinListIndex = userItems[userIndex].join.findIndex(
        item => item.cycleKey == cycleKey
      );
      cycleItems[cycleIndex].member.splice(memberListIndex, 1);
      userItems[userIndex].join.splice(joinListIndex, 1);
      cycleItems[cycleIndex].size -= 1;
    }

    await fs.promises.writeFile(this.cyclePath, JSON.stringify(cycleItems));
    await fs.promises.writeFile(this.userPath, JSON.stringify(userItems));
  }
}
