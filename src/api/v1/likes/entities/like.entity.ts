import { IsNotEmpty } from "@nestjs/class-validator";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { PostEntity } from "src/api/v1/posts/entities/post.entity";
import { CommentEntity } from "src/api/v1/comments/entities/comment.entity";

@Entity('likes')
export class LikeEntity extends BaseEntity {
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

  @ManyToOne((type) => PostEntity, (post) => post.likes)
  post: PostEntity;

  @ManyToOne((type) => CommentEntity, (comment) => comment.likes)
  comment: CommentEntity;
}