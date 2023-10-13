import { LikeEntity } from "src/likes/like.entity";
import { PostEntity } from "src/posts/post.entity";

export interface UserComment {
  id: number;
  userId: number;
  postId: number;
  parentCommentId?: number;
  commentMessage: string;
  creationTime: string;
  post: PostEntity;
  likes: LikeEntity[];
}