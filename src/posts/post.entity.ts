import { IsNotEmpty } from "@nestjs/class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}