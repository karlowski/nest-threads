import { CommentEntity } from "src/comments/comment.entity";
import { LikeEntity } from "src/likes/like.entity";

export interface UserPost {
  id: number;
  userId: number;
  postMessage: string;
  creationTime: string;
  comments: CommentEntity[];
  likes: LikeEntity[];
}