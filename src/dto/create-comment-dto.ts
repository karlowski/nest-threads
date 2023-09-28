export class CreateCommentDto {
  userId: number;
  postId: number;
  parentCommentId?: number;
  commentMessage: string;
}