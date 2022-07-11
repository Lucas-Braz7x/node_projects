import {
  Field, ID, ObjectType,
} from 'type-graphql';

@ObjectType()
export class Video {
  @Field(() => ID)
    id: string;

  @Field()
    title: string;

  @Field()
    description: string;

  @Field()
    category: string;
}
