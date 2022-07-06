import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @Column()
  @Field(() => ID)
    id: string;

  @Column()
  @Field()
    name: string;

  @Column()
  @Field()
    email: string;

  @Column()
  @Field()
    github_name: string;

  @Column()
  @Field()
    age: number;

  @Column()
  @Field()
    avatar: string;
}
