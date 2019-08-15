// functions/API/index.ts
import { Request, Response } from 'express'
import { ApolloServer } from 'apollo-server-cloud-functions'
import { buildSchema } from 'type-graphql';
import HelloWorldResolver from './Resolvers/HelloWorld/HelloWorld.resolver';
import PostsResolver from './Resolvers/Posts/Posts.resolver';

export const apiServer = async (req: Request, res: Response) => {
  const schema = await buildSchema({
    resolvers: [HelloWorldResolver, PostsResolver],
  })

  if (req.url === '/api') req.url = '/'

  const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    playground: false,
  })

  return apolloServer.createHandler({ cors: { origin: '*' } })(req, res)
}