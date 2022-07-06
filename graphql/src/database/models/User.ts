import { Field, ID, ObjectType } from 'type-graphql';
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

  @Column()
  @Field()
    password: string;

  @CreateDateColumn()
  @Field()
    created_at: Date;

  @UpdateDateColumn()
  @Field()
    updated_at: Date;
}
