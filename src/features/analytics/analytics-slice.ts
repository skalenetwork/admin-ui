import { MetricGroup } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  metrics: MetricGroup[];
}

const initialState: State = {
  metrics: [],
};

const analyticsSlice = createSlice({
  name: 'analytics',
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

export const { addMetricGroup } = analyticsSlice.actions;
export default analyticsSlice.reducer;
