// functions/Models/User.ts
import { ObjectType, Field, ForbiddenError, InputType } from 'type-graphql';
import { rootCollection, Entity, field, Collection } from 'firebase-firestorm';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

@ObjectType()
@rootCollection({
  name: 'Users'
})
export class User extends Entity {
  @Field()
  public id: string;

  @field({ name: 'username' })
  @Field()
  public username: string;

  @field({ name: 'password' })
  public password: string;
}

export async function saveUser({ username, password }: NewUserInput): Promise<User> {
  const users = await Collection(User).find({ where: [['username', '==', username]] });
  if (users[0]) throw new ForbiddenError();
  const user = new User();
  user.username = username;
  user.password = await hash(password, 10);
  return Collection(User).create(user);
}

interface LoginUserParams {
  username: string;
  plainText: string;
}

export async function loginUser({ username, plainText }: LoginUserParams): Promise<string> {
  const users = await Collection(User).find({ where: [['username', '==', username]] });
  if (!users || !users[0]) throw new ForbiddenError();
  const user = users[0];
  const valid = await compare(plainText, user.password);
  if (!valid) throw new ForbiddenError();
  return sign({ id: user.id }, 'SECRET', {
    expiresIn: '60d'
  });
}

@InputType()
export class NewUserInput {
  @Field()
  public username: string;

  @Field()
  public password: string;
}

@InputType()
export class LoginUserInput {
  @Field()
  public username: string;

  @Field()
  public password: string;
}
