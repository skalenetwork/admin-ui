export type KPI = {
  key: string;
  label: string;
  value: number;
};

export type MetricGroup = {
  period: string;
  kpis: KPI[];
};
