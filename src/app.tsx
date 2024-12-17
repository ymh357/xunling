import React from 'react';

import { registerRootComponent } from 'expo';
import { Provider as JotaiProvider } from 'jotai';
import { NativeWindStyleSheet } from 'nativewind';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { RootNavigator } from './navigation/RootNavigator';

import { useSetI18nFromStorage } from '@/i18n';

const queryClient = new QueryClient();

export default function App() {
  useSetI18nFromStorage();
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <RootNavigator />
      </JotaiProvider>
    </QueryClientProvider>
  );
}

NativeWindStyleSheet.setOutput({
  default: 'native',
});

registerRootComponent(App);
