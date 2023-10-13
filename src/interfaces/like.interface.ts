import { CommentEntity } from "src/comments/comment.entity";
import { PostEntity } from "src/posts/post.entity";

export interface UserLike {
  id: number;
  userId: number;
  postId?: number;
  commentId?: number;
  creationTime: string;
  post?: PostEntity;
  comment?: CommentEntity;
}