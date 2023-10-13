import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserNotFoundException } from 'src/exceptions/user-not-found.exception';
import { SerializedUser } from 'src/types/serialized-user';
import { EntitiesNotFoundException } from 'src/exceptions/entities-not-found.exception';
import { TimeService } from 'src/shared/services/time.service';
import { ApiResponse } from 'src/interfaces/api-response.interface';
import { UpdateUserDto } from 'src/dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private timeService: TimeService
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

  async create(user: CreateUserDto): Promise<SerializedUser> {
    try {
      const creationTime = this.timeService.catchActivityTime();
      const newUserData = await this.usersRepository.create({ ...user, creationTime, lastTimeOnline: creationTime });
      const savedUser = await this.usersRepository.save(newUserData);
    
      return new SerializedUser(savedUser);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: number, userData: UpdateUserDto): Promise<ApiResponse<SerializedUser>> {
    const user = await this.getUserById(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    try {
      const updatedUserResult = await this.usersRepository.update(id, userData);
      const user = await this.getUserById(id);

      return { 
        message: 'User updated successfully', 
        data: user 
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
