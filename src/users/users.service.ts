import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserNotFoundException } from 'src/exceptions/user-not-found.exception';
import { SerializedUser } from 'src/types/serialized-user';
import { EntitiesNotFoundException } from 'src/exceptions/entities-not-found.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async getUserById(id: number): Promise<SerializedUser> {
    const user = await this.usersRepository.findOne({
      where: { id }
    });
    
    if (!user) throw new UserNotFoundException();

    return new SerializedUser(user);
  }

  async getUserByEmail(email: string): Promise<SerializedUser> {
    const user = await this.usersRepository.findOne({
      where: { email }
    });

    if (!user) throw new UserNotFoundException();

    return new SerializedUser(user);
  }

  async getAll(): Promise<SerializedUser[]> {
    const users = await this.usersRepository.find();

    if (!users) throw new EntitiesNotFoundException(); 

    return users.map((user) => new SerializedUser(user))
  }

  async create(user: CreateUserDto): Promise<Record<string, string | SerializedUser>> {
    try {
      const newUserData = await this.usersRepository.create(user);
      const savedUser = await this.usersRepository.save(newUserData);
    
      return { 
        message: 'User created successfully',
        user: new SerializedUser(savedUser)
      }  
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(userData: Record<string, string | number>): Promise<Record<string, string | SerializedUser>> {
    const user = await this.getUserById(Number(userData.id));

    if (!user) {
      throw new UserNotFoundException();
    }

    try {
      const updatedUserResult = await this.usersRepository.update(userData.id, userData);
      const user = await this.getUserById(Number(userData.id));

      return { message: 'User updated successfully', user };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
