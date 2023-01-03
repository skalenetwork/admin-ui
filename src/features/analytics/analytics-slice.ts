/**
 * iteration1: concrete KPIs
 */

import { MetricGroup } from '@/types';
import {
  AnyAction,
  createSlice,
  Dispatch,
  PayloadAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

// make the slice

export type State = {
  metrics: MetricGroup[];
};

export const name = 'skale_analytics' as const;

export const initialState: State = {
  metrics: [],
};

const analyticsSlice = createSlice({
  name,
  initialState,
  reducers: {
    addMetricGroup(state, action: PayloadAction<MetricGroup>) {
      const { period } = action.payload;
      const index = state.metrics.findIndex((m) => m.period === period);
      index
        ? state.metrics.push(action.payload)
        : (state.metrics[index] = action.payload);
    },
  },
});

// slice consumables

export type StateWindow = { [name]: State };

export type SliceDispatch = ThunkDispatch<StateWindow, undefined, AnyAction> &
  Dispatch<AnyAction>;

export const useSliceSelector: TypedUseSelectorHook<State> = (selector) => {
  return useSelector((state: StateWindow) => selector(state[name]));
};

export const useSliceDispatch = () => useDispatch<SliceDispatch>();

export const { addMetricGroup } = analyticsSlice.actions;

export default analyticsSlice.reducer;
