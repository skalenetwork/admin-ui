import { useBlockHistory, usePoolStats } from '@/features/analytics';
import { useMemo } from 'react';

import Card from '@/components/Card/Card';
import { withErrorBoundary } from '@/elements/ErrorBoundary/ErrorBoundary';

// @ts-ignore
import { AxisOptions, Chart } from 'react-charts';
import { useTheme } from '../../hooks';

const fmtnum = Intl.NumberFormat('en-US');
const fmtcurr = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function FormattedMetric({
  amount = 0,
  label,
  format = 'number',
}: {
  amount: number;
  format?: 'currency' | 'number';
  label?: string;
}) {
  const numeral = Number(Number(amount).toFixed(0));
  let value = isNaN(amount)
    ? '...'
    : (format === 'currency' ? fmtcurr : fmtnum).format(numeral);
  return (
    <div>
      <p className="p-0 text-2xl font-semibold">{value}</p>
      {label && <p className="text-sm text-[var(--gray9)]">{label}</p>}
    </div>
  );
}

export function ChainAnalytics() {
  const countAccounts = 0;

  const dayStart = useMemo(() => Date.now() - (Date.now() % 86400000), []);

  const { isFetching, data: blocks } = useBlockHistory({
    time: dayStart,
    includeLatest: true,
  });

  const { walletBalance } = usePoolStats();

  const tx = Math.random() * 50000;

  return blocks ? (
    <div className="grid spaced h-full w-full grid-rows-[1fr_3fr]">
      <div className="grid spaced grid-cols-2">
        <div data-id="blocks" data-s="2">
          <Card full heading="Blocks">
            <div className="flex h-full min-w-max items-center justify-between gap-4">
              <FormattedMetric
                amount={blocks.blocksTotal}
                label="Total block count"
              />
              <FormattedMetric
                amount={blocks.blocksLatestMonth}
                label="Blocks last 30 days"
              />
              <FormattedMetric
                amount={blocks.blocksLatestWeek}
                label="Blocks last 7 days"
              />
            </div>
          </Card>
        </div>

        <div data-id="total_gas_save" data-s="-1">
          <Card full heading="Total Gas Fees Saved">
            <div className="flex h-full flex-col ">
              <div className="flex flex-col gap-2">
                <FormattedMetric format="currency" amount={tx / 12} />
                <FormattedMetric format="currency" amount={tx / 12 / 4} />
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="grid gap-x-3 grid-cols-3 grid-rows-[55%_45%] grid-flow-col">
        <div data-id="active_users" data-s="-1" className="mb-2">
          <Card full heading="Active users">
            <div className="grid grid-rows-3 gap-1 h-full">
              <FormattedMetric
                amount={countAccounts}
                label="Total user count"
              />
              <FormattedMetric
                amount={Math.floor(countAccounts / 30)}
                label="Users last 30 days"
              />
              <FormattedMetric
                amount={Math.floor(countAccounts / 4)}
                label="Users last 7 days"
              />
            </div>
          </Card>
        </div>
        <div data-id="ima_pool" data-s="1" className="mt-1">
          <Card
            full
            heading="IMA Community pool"
            bodyClass="h-full grid grid-rows-2 grid-cols-2"
          >
            <FormattedMetric amount={980} label="Active users" />
            <FormattedMetric amount={240} label="Inactive users" />
            <FormattedMetric amount={420} label="Exists" />
            <FormattedMetric
              amount={walletBalance}
              label="sChain wallet balance"
            />
          </Card>
        </div>
        <div data-id="transactions_count" data-s="-1">
          <Card full heading="Transactions" className="!rounded-b-none">
            <div className="grid grid-rows-3 gap-1 h-full">
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
          </Card>
        </div>
        <div data-id="transactions_chart" data-s="2">
          <Card
            full
            lean
            heading=""
            bodyClass="flex flex-col h-full"
            className="!rounded-t-none"
          >
            <div className="relative h-max flex-grow">
              <Bar />
            </div>
          </Card>
        </div>
        <div data-id="gas_save_count" data-s="-1">
          <Card full heading="Gas Fees saved" className="!rounded-b-none">
            <div className="grid grid-rows-3 gap-1 h-full">
              <FormattedMetric
                format="currency"
                amount={tx / 12}
                label="Transactions last 30 days"
              />
              <FormattedMetric
                format="currency"
                amount={tx / 12 / 4}
                label="Transactions last 7 days"
              />
            </div>
          </Card>
        </div>
        <div data-id="gas_save_chart" data-s="2">
          <Card
            full
            lean
            heading=""
            bodyClass="flex flex-col h-full"
            className="!rounded-t-none"
          >
            <div className="relative h-max flex-grow">
              <Bar />
            </div>
          </Card>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

// import ResizableBox from '../ResizableBox';

function Bar() {
  const { darkMode } = useTheme();
  const data = [
    {
      label: 'Series 1',
      data: [
        { primary: '1', secondary: Math.random() },
        { primary: '2', secondary: Math.random() },
        { primary: '3', secondary: Math.random() },
        { primary: '4', secondary: Math.random() },
        { primary: '5', secondary: Math.random() },
        { primary: '6', secondary: Math.random() },
        { primary: '7', secondary: Math.random() },
        { primary: '8', secondary: Math.random() },
        { primary: '9', secondary: Math.random() },
        { primary: '10', secondary: Math.random() },
      ],
    },
  ];

  const primaryAxis = useMemo<
    AxisOptions<(typeof data)[number]['data'][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary,
    }),
    [],
  );

  const secondaryAxes = useMemo<
    AxisOptions<(typeof data)[number]['data'][number]>[]
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
        defaultColors: ['var(--primary)'],
        dark: darkMode,
        tooltip: false,
      }}
    />
  );
}

export default withErrorBoundary(ChainAnalytics);
