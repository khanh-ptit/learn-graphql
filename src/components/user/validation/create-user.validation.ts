import { Injectable, ConflictException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserInput } from '../dto/create-user.input';

@Injectable()
export class CreateUserValidation {
  constructor(private readonly userRepository: UserRepository) {}

  async validate(request: CreateUserInput) {
    const user = await this.userRepository.findByCondition({
      where: { email: request.email },
    });
    if (user) {
      throw new ConflictException({
        statusCode: 409,
        message: 'User with email ' + request.email + ' already exists',
      });
    }
    return user;
  }
}
