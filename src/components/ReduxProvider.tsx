// src/components/ReduxProvider.tsx
'use client';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { CartHydrator } from './CartHydrator';

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>
    <CartHydrator>{children}</CartHydrator>
  </Provider>;
}
