/**
 * Store configuration
 * Registration of all sorts of reducers
 * Exporting derivative and aliased redux types
 */

import { configureStore, PreloadedState } from '@reduxjs/toolkit';

import analyticsReducer from '../features/analytics/analytics-slice';

export const store = configureStore({
  reducer: {
    counter: analyticsReducer,
  },
  // middleware: (getDefaultMiddleware) => {
  //   return getDefaultMiddleware().concat(api.middleware);
  // },
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return store;
};

export type Dispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
