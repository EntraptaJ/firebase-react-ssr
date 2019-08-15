// functions/API/HelloWorld/HelloWorld.resolver.ts
import 'reflect-metadata'
import { Resolver, Query, Arg, Mutation } from 'type-graphql'

@Resolver()
export default class HelloWorldResolver {
  @Query((type) => String)
  public async helloWorld(): Promise<string> {
    return 'Hello World'
  }

  @Mutation((type) => String)
  public async goodbyeWorld(@Arg('value', (type) => String) value: string) {
    return value
  }
}