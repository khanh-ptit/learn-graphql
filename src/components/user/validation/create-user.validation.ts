import { Injectable, ConflictException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserInput } from '../dto/create-user.input';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class CreateUserValidation {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly i18n: I18nService,
  ) {}

  async validate(request: CreateUserInput) {
    const user = await this.userRepository.findByCondition({
      where: { email: request.email },
    });
    if (user) {
      throw new ConflictException({
        statusCode: 409,
        message: this.i18n.t('message.USER_ALREADY_EXISTS', {
          args: { email: request.email },
        }),
      });
    }
    return user;
  }
}
