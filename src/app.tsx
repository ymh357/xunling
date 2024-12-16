import React from 'react';

import { registerRootComponent } from 'expo';
import { Provider as JotaiProvider } from 'jotai';
import { NativeWindStyleSheet } from 'nativewind';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';

import { RootNavigator } from './navigation/RootNavigator';

import i18n from '@/i18n';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <I18nextProvider i18n={i18n}>
          <RootNavigator />
        </I18nextProvider>
      </JotaiProvider>
    </QueryClientProvider>
  );
}

NativeWindStyleSheet.setOutput({
  default: 'native',
});

registerRootComponent(App);
