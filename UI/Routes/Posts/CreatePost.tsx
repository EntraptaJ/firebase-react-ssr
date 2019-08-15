// UI/Routes/Posts/CreatePost.tsx
import React, { useState, ChangeEvent } from 'react';
import { useMutation } from '@apollo/react-hooks';
import NEW_POST_GQL from './NewPost.graphql';
import { Post } from './type';

interface Value {
  title: string;
  body: string;
}

export default function CreatePost(): React.ReactElement {
  const [newPostFN] = useMutation<{ newPost: Post }, { input: Post }>(NEW_POST_GQL);
  const [value, setValue] = useState<Value>({ title: '', body: '' });

  const getValue = <T extends keyof Value>(field: T): Value[T] => value[field];

  const handleChange = <T extends keyof Value>(field: T) => ({ target }: ChangeEvent<HTMLInputElement>) =>
    setValue({ ...value, [field]: target.value });

  const createPost = async () => {
    const res = await newPostFN({ variables: { input: value } });
    console.log(res);
  };
  return (
    <div>
      <input style={{ marginTop: '1em' }} type='text' value={getValue('title')} onChange={handleChange('title')} />

      <input style={{ marginTop: '1em' }} type='text' value={getValue('body')} onChange={handleChange('body')} />

      <button onClick={createPost}>Create Post</button>
    </div>
  );
}
