// UI/Routes/Home/index.tsx
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import HELLO_WORLD_GQL from './helloWorld.graphql';

export default function HomeRoute(): React.ReactElement {
  const { data } = useQuery<{ helloWorld: string }>(HELLO_WORLD_GQL);
  return (
    <div>
      {data ? data.helloWorld : 'Loading'} 
    </div>
  )
}