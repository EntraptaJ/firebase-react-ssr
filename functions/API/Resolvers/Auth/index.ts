// functions/API/Resolvers/Auth/index.ts
import { Resolver, Mutation, Arg, Query, Ctx, Authorized } from 'type-graphql';
import { User, NewUserInput, saveUser, LoginUserInput, loginUser } from 'functions/API/Models/User';
import { Context } from 'functions/API/Context';

@Resolver(of => User)
export class AuthResolver {
  @Mutation(returns => User)
  public async registerUser(@Arg('user') user: NewUserInput): Promise<User> {
    return saveUser(user);
  }

  @Query(returns => User)
  @Authorized()
  public async me(@Ctx() { user }: Context): Promise<User> {
    return user;
  }

  @Mutation(returns => String)
  public async loginUser(@Arg('input') { username, password }: LoginUserInput): Promise<string> {
    return loginUser({ username, plainText: password });
  }
}
