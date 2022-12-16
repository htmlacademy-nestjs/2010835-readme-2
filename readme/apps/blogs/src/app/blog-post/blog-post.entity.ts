import { EntityInterface } from '@readme/core';
import { CommentInterface, PostInterface } from '@readme/shared-types';

export class BlogPostEntity implements EntityInterface<BlogPostEntity>, PostInterface{
  public id: number;
  public originPostId: number;
  public userId: string;
  public originUserId: string;
  public postCreationDate: Date;
  public originPostCreationDate: Date;
  public postType: string;
  public postState: string;
  public isRepost: boolean;
  public likeCount: number;
  public likeUsers: string[];
  public name: string;
  public videoLink: string;
  public announceText: string;
  public text: string;
  public author: string;
  public photo: string;
  public link: string;
  public tags: string[];
  public comments: CommentInterface[];

  toObject(): BlogPostEntity {
    return { ...this };
  }
  fillEntity(entity: PostInterface) {
    this.id = entity.id;
    this.originPostId = entity.originPostId;
    this.userId = entity.userId;
    this.originUserId = entity.originUserId;
    this.postCreationDate = new Date();
    this.originPostCreationDate = new Date();
    this.postType = entity.postType;
    this.postState = entity.postState;
    this.isRepost = entity.isRepost;
    this.likeCount = entity.likeCount;  //??
    this.likeUsers = entity.likeUsers;  //??
    this.name = entity.name;
    this.videoLink = entity.videoLink;
    this.announceText = entity.announcement;
    this.text = entity.text;
    this.author = entity.author;
    this.photo = entity.photo;
    this.link = entity.link;
    this.tags = [...entity.tags];
    this.comments = [];
  }

}
