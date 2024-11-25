import React from 'react';

import { registerRootComponent } from 'expo';
import { Provider as JotaiProvider } from 'jotai';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { RootNavigator } from './navigation/RootNavigator';

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

registerRootComponent(App);
