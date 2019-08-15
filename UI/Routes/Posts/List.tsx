// UI/Routes/Posts/List.tsx
import React from 'react';
import POSTS_GQL from './Posts.graphql';
import { useQuery } from '@apollo/react-hooks';
import { Post } from './type';

export default function PostsList(): React.ReactElement {
  const { data } = useQuery<{ Posts: Post[] }>(POSTS_GQL);
  return (
    <>
      {data && data.Posts ? (
        data.Posts.map(post => (
          <div key={post.title}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        ))
      ) : (
        <div>TODO Skeleton</div>
      )}
    </>
  );
}
