export class CreateCommentDto {
  id: number;
  userId: number;
  postId: number;
  parentCommentId?: number;
  commentMessage: string;
}