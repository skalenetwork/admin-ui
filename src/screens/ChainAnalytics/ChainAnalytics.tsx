import {
  useAnalytics,
  context as analyticsContext,
} from '@/features/analytics';
import { useSelector } from '@/app';

import { withErrorBoundary } from '@/elements/ErrorBoundary/ErrorBoundary';

const fmtnum = Intl.NumberFormat('en-US');

function FormattedMetric({ amount, label }: { amount: number; label: string }) {
  return (
    <div>
      <h2 className="p-0">{fmtnum.format(amount)}</h2>
      <p className="text-sm text-[var(--gray9)]">{label}</p>
    </div>
  );
}

export function ChainAnalytics() {
  useAnalytics();

  const metrics = useSelector((state) => state.skale_analytics.metrics);

  return metrics.length ? (
    <div className="grid h-full grid-rows-[1fr_3fr]">
      <div className="grid grid-cols-2">
        <div data-id="blocks" data-s="1">
          <div className="card-full">
            <h4>Blocks</h4>
            <div className="flex items-center justify-between">
              <FormattedMetric amount={72030} label="Total block count" />
              <FormattedMetric amount={72030} label="Total block count" />
              <FormattedMetric amount={72030} label="Total block count" />
            </div>
          </div>
        </div>
        <div data-id="total_gas_save" data-s="0"></div>
      </div>
      <div className="grid grid-cols-3">
        <div className="grid grid-rows-[3fr_2fr]">
          <div data-id="active_users" data-s="0"></div>
          <div data-id="ima_pool" data-s="0"></div>
        </div>
        <div data-id="transactions+chart" data-s="0"></div>
        <div data-id="gas_save+chart" data-s="0"></div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default withErrorBoundary(ChainAnalytics);

export const context = {
  ...analyticsContext.reducers,
};
