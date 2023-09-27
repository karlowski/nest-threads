import { IsNotEmpty } from "@nestjs/class-validator";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { UserPost } from "src/posts/post.entity";
import { UserComment } from "src/comments/comment.entity";

@Entity('likes')
export class UserLike extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: true })
  postId: number;

  @Column({ nullable: true })
  commentId: number;

  @IsNotEmpty()
  @Column({ nullable: false })
  creationTime: string;

  @ManyToOne((type) => UserPost, (post) => post.likes)
  post: UserPost;

  @ManyToOne((type) => UserComment, (comment) => comment.likes)
  comment: UserComment;
}