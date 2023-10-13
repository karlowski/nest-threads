import { IsNotEmpty } from "@nestjs/class-validator";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { PostEntity } from "src/posts/post.entity";
import { LikeEntity } from "src/likes/like.entity";

@Entity('comments')
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ nullable: false })
  userId: number;

  @IsNotEmpty()
  @Column({ nullable: false })
  postId: number;

  @Column({ nullable: true })
  parentCommentId: number;

  @IsNotEmpty()
  @Column({ nullable: false })
  commentMessage: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  creationTime: string;

  @ManyToOne((type) => PostEntity, (post) => post.comments)
  post: PostEntity;

  @OneToMany((type) => LikeEntity, (like) => like.comment, { cascade: true })
  likes: LikeEntity[];
}