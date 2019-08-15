// functions/API/index.ts
import { Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-cloud-functions';
import { buildSchema } from 'type-graphql';
import HelloWorldResolver from './Resolvers/HelloWorld/HelloWorld.resolver';
import PostsResolver from './Resolvers/Posts/Posts.resolver';
import { AuthResolver } from './Resolvers/Auth';
import { verify } from 'jsonwebtoken';
import { Context } from './Context';
import { Collection } from 'firebase-firestorm';
import { User } from './Models/User';
import { authChecker } from './Middleware/AuthChecker';

export const apiServer = async (req: Request, res: Response) => {
  const schema = await buildSchema({
    resolvers: [HelloWorldResolver, PostsResolver, AuthResolver],
    authChecker
  });

  if (req.url === '/api') req.url = '/';

  const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    playground: false,
    context: async ({ req }: { req: Request }): Promise<Context> => {
      if (!req.headers.authorization) return { user: undefined };
      const JWT = verify(req.headers.authorization.split('Bearer ')[1], 'SECRET') as { id: string };
      if (!JWT.id) return { user: undefined };
      else return { user: await Collection(User).get(JWT.id) };
    }
  });

  return apolloServer.createHandler({ cors: { origin: '*' } })(req, res);
};
