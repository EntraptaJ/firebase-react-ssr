// UI/Components/Providers/ConfigProvider.tsx
import React, { createContext, ReactNode, useContext, FunctionComponent } from 'react';

export interface Config {
  baseUrl: string;
}

const ConfigContext = createContext<Config>({
  baseUrl: 'http://localhost'
});

interface ConfigProviderProps extends Config {
  children: ReactNode;
}

export const ConfigProvider: FunctionComponent<ConfigProviderProps> = props => {
  const { children, ...configValue } = props;
  return <ConfigContext.Provider value={configValue}>{children}</ConfigContext.Provider>;
};

export function useConfig(): Config {
  return useContext(ConfigContext);
}
