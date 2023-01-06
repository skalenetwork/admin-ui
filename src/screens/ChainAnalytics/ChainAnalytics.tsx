import { useMemo } from 'react';
import {
  useAnalytics,
  context as analyticsContext,
  useBlockHistory,
} from '@/features/analytics';
import { useSelector } from '@/app';

import { withErrorBoundary } from '@/elements/ErrorBoundary/ErrorBoundary';
import Card from '@/components/Card/Card';
import { Loading } from '@/components/Loading/Loading';

// @ts-ignore
import { AxisOptions, Chart } from 'react-charts';

const fmtnum = Intl.NumberFormat('en-US');

function FormattedMetric({
  amount = 0,
  label,
}: {
  amount: number;
  label: string;
}) {
  let _amount = Number(amount.toFixed(0));
  let value = _amount ? fmtnum.format(_amount) : '...';
  return (
    <div>
      <p className="p-0 text-3xl font-semibold">{value}</p>
      <p className="text-sm text-[var(--gray9)]">{label}</p>
    </div>
  );
}

export function ChainAnalytics() {
  useAnalytics();
  const dayStart = useMemo(() => Date.now() - (Date.now() % 86400000), []);
  const { isFetching, data } = useBlockHistory({
    time: dayStart,
    includeLatest: true,
  });

  console.log(isFetching, data);

  const metrics = useSelector((state) => state.skale_analytics.metrics);

  const blk = Math.random() * 72000;
  const tx = Math.random() * 50000;

  return metrics.length ? (
    <div className="grid h-full grid-rows-[1fr_3fr]">
      <div className="grid grid-cols-2">
        <div data-id="blocks" data-s="2">
          <Card full heading="Blocks">
            <div className="flex h-full items-center justify-between">
              <FormattedMetric
                amount={data.blocksTotal}
                label="Total block count"
              />
              <FormattedMetric
                amount={data.blocksLatestMonth}
                label="Blocks last 30 days"
              />
              <FormattedMetric
                amount={data.blocksLatestWeek}
                label="Blocks last 7 days"
              />
            </div>
          </Card>
        </div>
        <div data-id="total_gas_save" data-s="0"></div>
      </div>
      <div className="grid grid-cols-3">
        <div className="grid grid-rows-[3fr_2fr]">
          <div data-id="active_users" data-s="0"></div>
          <div data-id="ima_pool" data-s="0"></div>
        </div>
        <div data-id="transactions+chart" data-s="1">
          <Card full heading="Transactions">
            <div className="flex h-full flex-col ">
              <div className="flex flex-col gap-2">
                <FormattedMetric amount={tx} label="Total transactions count" />
                <FormattedMetric
                  amount={tx / 12}
                  label="Transactions last 30 days"
                />
                <FormattedMetric
                  amount={tx / 12 / 4}
                  label="Transactions last 7 days"
                />
              </div>
              <div className="relative h-[max] flex-grow">
                <Bar />
              </div>
            </div>
          </Card>
        </div>
        <div data-id="gas_save+chart" data-s="0"></div>
      </div>
    </div>
  ) : (
    <></>
  );
}

// import ResizableBox from '../ResizableBox';

function Bar() {
  const data = [
    {
      label: 'Series 1',
      data: [
        { primary: '1', secondary: 40 },
        { primary: '2', secondary: 96 },
        { primary: '3', secondary: 49 },
        { primary: '4', secondary: 92 },
        { primary: '5', secondary: 38 },
        { primary: '6', secondary: 57 },
        { primary: '7', secondary: 50 },
        { primary: '8', secondary: 11 },
        { primary: '9', secondary: 57 },
        { primary: '10', secondary: 49 },
      ],
    },
  ];

  const primaryAxis = useMemo<AxisOptions<typeof data[number]['data'][number]>>(
    () => ({
      getValue: (datum) => datum.primary,
    }),
    [],
  );

  const secondaryAxes = useMemo<
    AxisOptions<typeof data[number]['data'][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    [],
  );

  return (
    <Chart
      options={{
        data,
        primaryAxis,
        secondaryAxes,
        defaultColors: ['#2186DE'],
      }}
    />
  );
}

export default withErrorBoundary(ChainAnalytics);

export const context = {
  ...analyticsContext.reducers,
};
