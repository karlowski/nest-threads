import { IsNotEmpty } from "@nestjs/class-validator";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { CommentEntity } from "src/comments/comment.entity";
import { LikeEntity } from "src/likes/like.entity";

@Entity('posts')
export class PostEntity extends BaseEntity {
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

  @OneToMany((type) => CommentEntity, (comment) => comment.post, { cascade: true })
  comments: CommentEntity[];

  @OneToMany((type) => LikeEntity, (like) => like.post, { cascade: true })
  likes: LikeEntity[];
}