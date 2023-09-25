import { IsNotEmpty } from "@nestjs/class-validator";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { UserPost } from "src/posts/post.entity";

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
}