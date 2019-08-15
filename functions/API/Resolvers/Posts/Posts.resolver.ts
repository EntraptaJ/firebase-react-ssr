// API/Resolvers/Posts/PostsResolver.ts
import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import Post, { NewPostInput, PostItem } from 'functions/API/Models/Posts';
import { Collection } from 'firebase-firestorm';
import { ApolloError } from 'apollo-server-core';

@Resolver(of => PostItem)
export default class PostsResolver {
  @Query(returns => [PostItem])
  public async Posts(): Promise<Post[]> {
    const Posts = await Collection(Post).find()
    return Posts
  }

  @Mutation(returns => PostItem)
  public async newPost(@Arg('input') input: NewPostInput): Promise<Post> {
    const post = new Post()
    post.body = input.body
    post.title = input.title
    const newPost = await Collection(Post).create(post)
    if (!newPost) throw new ApolloError('INVALID POST');
    else return newPost;
  }
}