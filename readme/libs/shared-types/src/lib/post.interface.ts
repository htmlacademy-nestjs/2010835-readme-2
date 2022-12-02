import { PostState } from "./post-state.enum";
import { PostType } from "./postType.enum";


export interface PostInterface{
  _id: string;
  originPostId: string;
  userId: string;
  originUserId: string;
  postCreationDate: Date;
  originPostCreationDate: Date;
  postType: PostType;
  postState: PostState;
  isRepost: boolean;
  likeCount: number;
  likeUsers: string[];
  name?: string;                  //video, text
  videoLink?: string;             //video,
  announcement?: string;          //text,
  text?: string;                  //text, quote, link
  author?: string;                //quote
  photo?: string;                 //photo
  link?: string;                  //link
  tags?: string[];                //video, photo, text, quote, link
}
