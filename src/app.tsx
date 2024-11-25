import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RootNavigator } from './navigation/RootNavigator';
import { Provider as JotaiProvider } from 'jotai';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <RootNavigator />
      </JotaiProvider>
    </QueryClientProvider>
  );
}