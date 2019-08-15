// functions/Models/Model.ts
import { Entity, rootCollection, field } from 'firebase-firestorm';
import { ObjectType, Field, InputType } from 'type-graphql';

@rootCollection({
  name: 'Posts'
})
export default class Post extends Entity {
  @field({ name: 'title' })
  title!: string;

  @field({ name: 'body' })
  body!: string;
}

@ObjectType()
export class PostItem {
  @Field()
  title: string;

  @Field()
  body: string;
}

@InputType()
export class NewPostInput {
  @Field()
  public title: string;

  @Field()
  public body: string;
}
