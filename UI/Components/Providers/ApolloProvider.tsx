// UI/UI/Components/Providers/ApolloProvider.tsx
import React, { FunctionComponent } from 'react';
import { ApolloProvider as HookApolloProvider } from '@apollo/react-hooks';
import { useConfig } from 'UI/Components/Providers/ConfigProvider';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { initApollo } from 'UI/Utils/initApollo';
import { ApolloCache } from 'apollo-cache';

interface ApolloProviderProps {
  state?: NormalizedCacheObject;
  client?: ApolloClient<NormalizedCacheObject>;
  cache?: ApolloCache<any>;
}

type ApolloProviderType = FunctionComponent<ApolloProviderProps>;

export const ApolloProvider: ApolloProviderType = ({
  children,
  client,
  state = typeof window !== 'undefined' ? window.APP_STATE.APOLLO_STATE : {},
  cache
}) => {
  const { baseUrl } = useConfig();

  if (!client) client = initApollo({ initialState: state, baseUrl, cache });

  return <HookApolloProvider client={client}>{children}</HookApolloProvider>;
};
