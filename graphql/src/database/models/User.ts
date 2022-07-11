import {
  Field, ID, Int, ObjectType,
} from 'type-graphql';
import {
  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('user')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
    id: string;

  @Column()
  @Field(() => String!)
    name: string;

  @Column()
  @Field(() => String!)
    email: string;

  @Column()
  @Field(() => String!, { nullable: true })
    github_name: string;

  @Column()
  @Field(() => Int)
    age: number;

  @Column()
  @Field(() => String!)
    avatar: string;

  @Column()
  @Field(() => String!)
    password: string;

  @CreateDateColumn()
  @Field()
    created_at: Date;

  @UpdateDateColumn()
  @Field()
    updated_at: Date;
}
