/**
 * Store configuration
 * Registration of all sorts of reducers
 * Exporting derivative and aliased redux types
 */
import { context as analytics } from '@/screens/ChainAnalytics/ChainAnalytics';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    ...analytics,
  },
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return store;
};

export type Dispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
