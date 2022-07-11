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
  // Requisição para uma url
  @Query(() => Github)
  async github(@Arg('githubUsername') githubUsername: string, @Ctx() { dataSources }: Context) {
    const data = await dataSources.githubDataSource.getUser(githubUsername);
    return data;
  }

  // Requisição para outra url
  // retornando 'repos' para a primeira requisição
  @FieldResolver(() => [GithubRepos])
  async repos(@Root() { repos }: Github, @Ctx() { dataSources }: Context) {
    repos = await dataSources.githubDataSource.getRepos('Lucas-Braz7x');
    return repos;
  }
}
