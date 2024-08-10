import { Provide } from '@midwayjs/core';
import * as fs from 'fs';
import * as path from 'path';

@Provide()
export class CycleService {
  private data: Array<any>;
  private userPath = path.resolve(__dirname, '../data/Users.json');
  private postPath = path.resolve(__dirname, '../data/Posts');

  constructor() {
    const files = fs
      .readdirSync(this.postPath)
      .filter(file => file.endsWith('.json'));

    // 解析所有 JSON 文件并存储到数组中
    this.data = files.map(file => {
      const filePath = path.join(this.postPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(fileContent);
    });
  }

  async getPosts(cycleKey: number) {
    return this.data[cycleKey];
  }

  getTargetPath(cycleKey: number): string {
    const targetFile = path.join(this.postPath, `${cycleKey}.json`);
    return targetFile;
  }
  async newPost(cycleKey: number, postBody: any, imageIndex: string[]) {
    const { userID, title, content } = postBody;

    const userData = await fs.promises.readFile(this.userPath, 'utf-8');
    const userItems = JSON.parse(userData);
    const userIndex = userItems.findIndex(item => item.id == userID);

    const postItems = this.data[cycleKey];
    const newKey = postItems.length + 1;

    const newPost = {
      key: newKey,
      author: {
        userID: `${userItems[userIndex].id}`,
        name: `${userItems[userIndex].profile.name}`,
        intro: `${userItems[userIndex].profile.intro}`,
        avator: `${userItems[userIndex].profile.avator}`,
      },
      title: `${title}`,
      content: `${content}`,
      photos: imageIndex,
      likes: 0,
      comments: 0,
      likeList: [],
      commentList: [],
    };

    postItems.push(newPost);
    userItems[userIndex].post.push({
      cycleKey: `${cycleKey}`,
      post: `${newKey}`,
    });

    await fs.promises.writeFile(
      this.getTargetPath(cycleKey),
      JSON.stringify(postItems)
    );

    await fs.promises.writeFile(this.userPath, JSON.stringify(userItems));
  }

  async handleLike(
    type: boolean,
    cycleKey: number,
    postKey: number,
    userID: number
  ) {
    const userData = await fs.promises.readFile(this.userPath, 'utf-8');
    const userItems = JSON.parse(userData);
    const userIndex = userItems.findIndex(item => item.id == userID);

    const postItems = this.data[cycleKey];
    const postIndex = postItems.findIndex(item => item.key == postKey);

    if (type) {
      postItems[postIndex].likes += 1;
      postItems[postIndex].likeList.push(userID);
    } else {
      const userLikeIndex = postItems[postIndex].likeList.indexOf(userID);
      postItems[postIndex].likes -= 1;
      postItems[postIndex].likeList.splice(userLikeIndex, 1);
    }

    await fs.promises.writeFile(
      this.getTargetPath(cycleKey),
      JSON.stringify(postItems)
    );
    const likeIndex = userItems[userIndex].like.findIndex(
      item => item.cycle == cycleKey
    );
    if (type && likeIndex === -1) {
      userItems[userIndex].like.push({ cycle: cycleKey, post: [postKey] });
    } else if (type) {
      userItems[userIndex].like[likeIndex].post.push(postIndex);
    } else {
      const likeListIndex =
        userItems[userIndex].like[likeIndex].post.indexOf(postKey);
      userItems[userIndex].like[likeIndex].post.splice(likeListIndex, 1);
      if (userItems[userIndex].like[likeIndex].post.length === 0) {
        userItems[userIndex].like.splice(likeIndex, 1);
      }
    }

    await fs.promises.writeFile(this.userPath, JSON.stringify(userItems));
  }
}
