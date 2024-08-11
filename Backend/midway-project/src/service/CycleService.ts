import { Provide } from '@midwayjs/core';
import * as fs from 'fs';
import * as path from 'path';

@Provide()
export class CycleService {
  private data: Array<any>;
  private userPath = path.resolve(__dirname, '../data/Users.json');
  private postPath = path.resolve(__dirname, '../data/Posts');

  constructor() {
    this.readFile();
  }
  readFile() {
    const files = fs
      .readdirSync(this.postPath)
      .filter(file => file.endsWith('.json'));

    this.data = files.map(file => {
      const filePath = path.join(this.postPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(fileContent);
    });
  }

  getTargetPath(cycleKey: number): string {
    cycleKey = Number(cycleKey);
    const targetFile = path.join(this.postPath, `${cycleKey}.json`);
    return targetFile;
  }
  async getCycle(cycleKey: number) {
    cycleKey = Number(cycleKey);
    return this.data[cycleKey];
  }

  async getPost(cycleKey: number, postKey: number) {
    cycleKey = Number(cycleKey);
    postKey = Number(postKey);

    const index = this.data[cycleKey].findIndex(item => item.key == postKey);
    return this.data[cycleKey][index];
  }

  async postComment(cycleKey: number, postKey: number, formData: any) {
    let { userID, content } = formData;

    cycleKey = Number(cycleKey);
    userID = Number(userID);
    postKey = Number(postKey);

    const userData = await fs.promises.readFile(this.userPath, 'utf-8');
    const userItems = JSON.parse(userData);
    const userIndex = userItems.findIndex(item => item.id == userID);

    const postIndex = this.data[cycleKey].findIndex(
      item => item.key == postKey
    );

    this.data[cycleKey][postIndex].comments += 1;
    const commentKey = this.data[cycleKey][postIndex].comments;

    this.data[cycleKey][postIndex].commentList.push({
      key: commentKey,
      author: {
        id: userID,
        name: userItems[userIndex].profile.name,
        intro: userItems[userIndex].profile.intro,
        avatar: userItems[userIndex].profile.avatar,
      },
      content: content,
    });

    await fs.promises.writeFile(
      this.getTargetPath(cycleKey),
      JSON.stringify(this.data[cycleKey])
    );

    const newPostObj = {
      postKey: postKey,
      comment: [commentKey],
    };

    const newCycleObj = {
      cycleKey: cycleKey,
      post: [newPostObj],
    };

    const commentIndex = userItems[userIndex].comment.findIndex(
      item => item.cycleKey == cycleKey
    );

    if (commentIndex == -1) {
      userItems[userIndex].comment.push(newCycleObj);
    } else {
      const pIndex = userItems[userIndex].comment[commentIndex].post.findIndex(
        item => item.postKey == postKey
      );
      if (pIndex == -1) {
        userItems[userIndex].comment[commentIndex].push(newPostObj);
      } else {
        userItems[userIndex].comment[commentIndex].post[pIndex].comment.push(
          commentKey
        );
      }
    }

    userItems[userIndex].commentNum += 1;
    await fs.promises.writeFile(this.userPath, JSON.stringify(userItems));
  }

  async postNewCycle(cycleKey: number) {
    cycleKey = Number(cycleKey);

    await fs.promises.writeFile(
      this.getTargetPath(cycleKey),
      JSON.stringify([])
    );
    this.readFile();
  }
  async newPost(cycleKey: number, postBody: any, imageIndex: string[]) {
    let { userID, title, content } = postBody;

    cycleKey = Number(cycleKey);
    userID = Number(userID);

    const userData = await fs.promises.readFile(this.userPath, 'utf-8');
    const userItems = JSON.parse(userData);
    const userIndex = userItems.findIndex(item => item.id == userID);

    const postItems = this.data[cycleKey];
    const newKey = postItems.length + 1;

    const newPost = {
      key: newKey,
      author: {
        userID: userItems[userIndex].id,
        name: userItems[userIndex].profile.name,
        intro: userItems[userIndex].profile.intro,
        avatar: userItems[userIndex].profile.avatar,
      },
      title: title,
      content: content,
      photos: imageIndex,
      likes: 0,
      comments: 0,
      likeList: [],
      commentList: [],
    };

    postItems.push(newPost);

    const newPostObj = {
      postKey: newKey,
      title: title,
    };

    const newCycleObj = {
      cycleKey: cycleKey,
      post: [newPostObj],
    };

    const cycleIndex = userItems[userIndex].post.findIndex(
      item => item.cycleKey == cycleKey
    );

    if (cycleIndex == -1) {
      userItems[userIndex].post.push(newCycleObj);
    } else {
      userItems[userIndex].post[cycleIndex].post.push(newPostObj);
    }

    await fs.promises.writeFile(
      this.getTargetPath(cycleKey),
      JSON.stringify(postItems)
    );

    userItems[userIndex].postNum += 1;
    await fs.promises.writeFile(this.userPath, JSON.stringify(userItems));
  }

  async handleLike(
    type: boolean,
    cycleKey: number,
    postKey: number,
    userID: number
  ) {
    cycleKey = Number(cycleKey);
    userID = Number(userID);
    postKey = Number(postKey);

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
      userItems[userIndex].likeNum += 1;
    } else if (type) {
      userItems[userIndex].like[likeIndex].post.push(postIndex);
      userItems[userIndex].likeNum += 1;
    } else {
      userItems[userIndex].likeNum -= 1;
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
