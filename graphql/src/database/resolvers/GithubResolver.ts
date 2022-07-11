/* eslint-disable no-param-reassign */
import 'reflect-metadata';
import {
  Arg,
  Ctx,
  FieldResolver,
  Query, Resolver, Root,
} from 'type-graphql';

import { GithubRepos } from '../models/GithubRepos';
import { GithubDataSource } from '../dataSources/GithubDataSource';
import { Github } from '../models/Github';
// import { GithubRepos } from '../models/GithubRepos';

interface Context {
  dataSources: {
    githubDataSource: GithubDataSource;
  };
}

@Resolver(() => Github)
export class GithubResolver {
  /* @Query(() => GithubRepos)
  async github(@Ctx() context: Context) {
    return context.dataSources.githubDataSource.getUser('Lucas-Braz7x');
  } */
  @Query(() => Github)
  async github(@Arg('githubUsername') githubUsername: string, @Ctx() { dataSources }: Context) {
    const data = await dataSources.githubDataSource.getUser(githubUsername);
    return data;
  }

  @FieldResolver(() => [GithubRepos])
  async repos(@Root() { repos }: Github, @Ctx() { dataSources }: Context) {
    repos = await dataSources.githubDataSource.getRepos('Lucas-Braz7x');
    return repos;
  }
}
