import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType() // Cho GraphQL biết đây là 1 Object Type
@Entity({ name: 'users' }) // Cho TypeORM biết đây là 1 bảng trong Database
export class User {
  @Field(() => ID) // Khai báo trường này cho GraphQL
  @PrimaryGeneratedColumn('uuid') // Khai báo cột ID cho Database
  id: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  // KHÔNG dùng @Field() ở đây để GraphQL KHÔNG trả về password cho client
  @Column()
  password: string;

  @Field({ defaultValue: false })
  @Column({ default: false })
  isVerified: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  age?: number;
}
