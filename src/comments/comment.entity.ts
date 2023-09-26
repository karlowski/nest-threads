import { IsNotEmpty } from "@nestjs/class-validator";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { UserPost } from "src/posts/post.entity";
import { UserLike } from "src/likes/like.entity";

@Entity('comments')
export class UserComment extends BaseEntity {
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

  @ManyToOne((type) => UserPost, (post) => post.comments)
  post: UserPost;

  @OneToMany((type) => UserLike, (like) => like.comment, { cascade: true })
  likes: UserLike[];
}