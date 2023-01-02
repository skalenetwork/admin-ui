import analyticsReducer, { name } from './analytics-slice';

export const context = {
  scope: 'analytics',
  reducers: {
    [name]: analyticsReducer,
  },
};

export * from './hooks';
