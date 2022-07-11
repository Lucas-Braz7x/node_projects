/* eslint-disable no-param-reassign */
import 'reflect-metadata';
import {
  Arg,
  Mutation,
  Query, Resolver,
} from 'type-graphql';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  async users() {
    const user: User[] = await UserRepository.find();
    return user;
  }

  @Query(() => User)
  async user(@Arg('id') id: string) {
    const user: User = await UserRepository.findById(id);
    return user;
  }

  @Mutation(() => User)
  async createUser(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('github_name') github_name: string,
    @Arg('age') age: number,
    @Arg('avatar') avatar: string,
    @Arg('password') password: string,
  ) : Promise<User | Error> {
    const existEmail: User = await UserRepository.findByEmail(email);

    if (existEmail) return new Error('This Email address already exists');

    const user = UserRepository.create({
      name,
      email,
      github_name,
      age,
      avatar,
      password,
    });

    await UserRepository.save(user);
    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Arg('id') id: string,
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('github_name') github_name: string,
    @Arg('age') age: number,
    @Arg('avatar') avatar: string,
  ) : Promise<User | Error> {
    const user = await UserRepository.findById(id);

    if (!user) return new Error('User does not found');

    const userEmailExist = await UserRepository.findByEmail(email);

    if (userEmailExist) return new Error('This email address already exists');

    user.name = name || user.name;
    user.email = email || user.email;
    user.github_name = github_name || user.github_name;
    user.age = age || user.age;
    user.avatar = avatar || user.avatar;

    await UserRepository.save(user);

    return user;
  }

  @Mutation(() => User)
  async deleteUser(@Arg('id') id: string): Promise<void> {
    const user = await UserRepository.findById(id);

    if (!user) throw new Error('User does not exist');

    await UserRepository.remove(user);
  }
}
