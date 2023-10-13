import { IsEmail, IsNotEmpty } from "@nestjs/class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('users')
@Unique(['email', 'username'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  @Column({ nullable: false })
  email: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  username: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  password: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  creationTime: string;

  @Column({ nullable: true })
  lastTimeOnline: string;
}