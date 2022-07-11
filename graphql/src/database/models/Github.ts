import {
  Field, ID, ObjectType,
} from 'type-graphql';
import { JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GithubRepos } from './GithubRepos';
// import { GithubRepos } from './GithubRepos';
import { User } from './User';

/* @ObjectType()
export class Github {
  @Field(() => ID)
    id: string;

  @Field(() => String!)
    github_name: string;

  @Field(() => [GithubRepos])
    github_repos: [string];

  @Field(() => User)
    user: string;
}
 */

@ObjectType()
export class Github {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
    id: string;

  @Field(() => String!)
    login: string;

  @Field(() => String!)
    node_id: string;

  @Field(() => String)
    avatar_url: string;

  @Field(() => String!)
    url: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'login' })
  @Field(() => [GithubRepos], { nullable: true })
    repos: GithubRepos[];
}
