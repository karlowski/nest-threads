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

  async getUserById(id: number): Promise<User> {
    return await this.usersRepository.findOne({
      where: { id }
    });
}

  async getUserByEmail(email: string): Promise<User> {
      return await this.usersRepository.findOne({
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
      const { id, username, email, creationTime, lastTimeOnline } = await this.usersRepository.save(newUserData);
    
      return { 
        message: 'User created successfully',
        user: { id, username, email, creationTime, lastTimeOnline }
      }  
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(userData: Record<string, string | number>): Promise<any> {
    const user = await this.getUserById(Number(userData.id));

    if (!user) {
      throw new HttpException({ message: 'No such user found', status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
    }

    try {
      const updatedUserResult = await this.usersRepository.update(userData.id, userData);
      const { id, username, email, creationTime, lastTimeOnline } = await this.getUserById(Number(userData.id));

      return { 
        message: 'User updated successfully', 
        user: { id, username, email, creationTime, lastTimeOnline } 
      };
    } catch ({ message, status  }) {
      throw new HttpException({ message, status  }, HttpStatus.BAD_REQUEST);
    }
  }
}
