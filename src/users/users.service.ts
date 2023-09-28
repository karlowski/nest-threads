import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async getUserByEmail(email: string): Promise<User> {
      return await this.usersRepository.findOne({
        select: [],
        where: { email }
      });
  }

  async getAll(): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['id', 'username', 'email', 'creationTime', 'lastTimeOnline']
    });
  }

  async create(user: CreateUserDto): Promise<any> {
    try {
      const newUserData = await this.usersRepository.create(user);
      const createdUser = await this.usersRepository.save(newUserData);
    
      return { 
        user: { username: createdUser.username, email: createdUser.email },
        message: 'User successfully created'
      }  
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(userData: Record<string, string | number>): Promise<void> {
    try {
      const updatedUser = await this.usersRepository.update(userData.id, userData);
    } catch ({ message, status  }) {
      throw new HttpException({ message, status  }, HttpStatus.BAD_REQUEST)
    }
  }
}
