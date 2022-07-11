import { RESTDataSource } from 'apollo-datasource-rest';
import { Github } from '../models/Github';
import { GithubRepos } from '../models/GithubRepos';

export class GithubDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.github.com/users/';
  }

  async getUser(userName: string): Promise<Github> {
    return this.get(`/${userName}`);
  }

  async getRepos(userName: string): Promise<GithubRepos[]> {
    return this.get(`/${userName}/repos`);
  }
}
