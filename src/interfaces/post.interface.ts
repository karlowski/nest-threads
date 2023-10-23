import { CommentEntity } from "src/api/v1/comments/comment.entity";
import { LikeEntity } from "src/api/v1/likes/like.entity";

export interface UserPost {
  id: number;
  userId: number;
  postMessage: string;
  creationTime: string;
  comments: CommentEntity[];
  likes: LikeEntity[];
}