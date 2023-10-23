import { CommentEntity } from "src/api/v1/comments/entities/comment.entity";
import { PostEntity } from "src/api/v1/posts/entities/post.entity";

export interface UserLike {
  id: number;
  userId: number;
  postId?: number;
  commentId?: number;
  creationTime: string;
  post?: PostEntity;
  comment?: CommentEntity;
}