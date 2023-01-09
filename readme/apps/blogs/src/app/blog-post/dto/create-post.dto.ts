
export interface CreatePostDto{
  originPostId: number;
  userId: string;
  originUserId: string;
  publishDate: Date;
  postType: string;
  postState: string;
  isRepost: boolean;
  name?: string;                  //video, text
  videoLink?: string;             //video,
  announceText?: string;          //text,
  text?: string;                  //text, quote, link
  author?: string;                //quote
  photo?: string;                 //photo
  link?: string;                  //link
  tags: string[];
}
