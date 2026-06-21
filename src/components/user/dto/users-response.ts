import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class UsersResponse {
  @Field(() => Int)
  statusCode: number;

  @Field({ nullable: true })
  message?: string;

  @Field(() => [User], { nullable: true })
  data?: User[];
}
