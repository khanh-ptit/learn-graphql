import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { CreateUserValidation } from './validation/create-user.validation';
import { I18nService } from 'nestjs-i18n';
import { UsersResponse } from './dto/users-response';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly createUserValidation: CreateUserValidation,
    private readonly i18n: I18nService,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    await this.createUserValidation.validate(createUserInput);

    const newUser = this.userRepository.createEntity(createUserInput);
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<UsersResponse> {
    const users = await this.userRepository.findAll();
    return {
      statusCode: 200,
      message: this.i18n.t('message.SUCCESS'),
      data: users,
    };
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    // Make sure user exists
    await this.findOne(id);
    return await this.userRepository.updateOne(id, updateUserInput);
  }

  async remove(id: string): Promise<boolean> {
    // Make sure user exists
    await this.findOne(id);
    return await this.userRepository.remove(id);
  }
}
