import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { DatabaseModule } from '../../database/database.module';
import { CreateUserValidation } from './validation/create-user.validation';

@Module({
  imports: [DatabaseModule],
  providers: [UserResolver, UserService, CreateUserValidation],
})
export class UserModule {}
