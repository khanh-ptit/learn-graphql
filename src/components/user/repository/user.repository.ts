import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../core/repository/base.repository';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  createEntity(user: CreateUserInput) {
    const userEntity = new User();

    userEntity.username = user.username;
    userEntity.name = user.name;
    userEntity.email = user.email;
    userEntity.password = user.password;
    userEntity.age = user.age;
    if (user.isVerified) {
      userEntity.isVerified = user.isVerified;
    }
    return userEntity;
  }
}
