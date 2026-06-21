import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field(() => Boolean, { nullable: true })
  isVerified?: boolean;
}
