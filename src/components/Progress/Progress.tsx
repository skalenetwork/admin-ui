import * as ProgressPrimitive from '@radix-ui/react-progress';

interface Props {
  className?: string;
  value: number;
}

const Progress = ({ value, className }: Props) => {
  return (
    <ProgressPrimitive.Root
      value={value}
      className="h-2 w-full overflow-hidden rounded-full bg-[var(--gray3)]"
      style={{
        boxShadow: '0 0 0 2px var(--gray3)',
      }}
    >
      <ProgressPrimitive.Indicator
        style={{ width: `${value}%` }}
        className="h-full bg-[var(--gray8)] duration-300 ease-in-out"
      />
    </ProgressPrimitive.Root>
  );
};

export default Progress;
