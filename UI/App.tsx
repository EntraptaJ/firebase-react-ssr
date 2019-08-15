// UI/App.tsx
import React from 'react';
import AppRouter from './Components/Router';

export function App(): React.ReactElement {
  return (
    <main
      style={{
        height: '100%'
      }}
    >
      <AppRouter />
    </main>
  );
}
