import {
  Field, ID, ObjectType,
} from 'type-graphql';

@ObjectType()
export class GithubRepos {
  @Field(() => ID)
    id: string;

  @Field(() => String!)
    name: string;

  @Field(() => String!)
    full_name: string;

  @Field(() => String, { nullable: true })
    description: string;

  @Field(() => String!)
    url: string;
}
