import { Exclude } from 'class-transformer';

export class SerializedUser {
  id: number;
  email: string;
  username: string;
  creationTime: string;
  lastTimeOnline: string;

  @Exclude()
  password: string;

  constructor(partialUser: Partial<SerializedUser>) {
    Object.assign(this, partialUser);
  }
} 