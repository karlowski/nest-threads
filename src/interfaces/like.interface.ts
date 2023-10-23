import { CommentEntity } from "src/api/v1/comments/comment.entity";
import { PostEntity } from "src/api/v1/posts/post.entity";

export interface UserLike {
  id: number;
  userId: number;
  postId?: number;
  commentId?: number;
  creationTime: string;
  post?: PostEntity;
  comment?: CommentEntity;
}