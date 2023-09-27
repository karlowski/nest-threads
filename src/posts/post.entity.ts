import { IsNotEmpty } from "@nestjs/class-validator";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { UserComment } from "src/comments/comment.entity";
import { UserLike } from "src/likes/like.entity";

@Entity('posts')
export class UserPost extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ nullable: false })
  userId: number;

  @IsNotEmpty()
  @Column({ nullable: false })
  postMessage: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  creationTime: string;

  @OneToMany((type) => UserComment, (comment) => comment.post, { cascade: true })
  comments: UserComment[];

  @OneToMany((type) => UserLike, (like) => like.post, { cascade: true })
  likes: UserLike[];
}