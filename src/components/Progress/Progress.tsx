import * as ProgressPrimitive from '@radix-ui/react-progress';

interface Props {
  value: number;
}

const Progress = ({ value }: Props) => {
  return (
    <ProgressPrimitive.Root
      value={value}
      className="h-3 w-full overflow-hidden rounded-full bg-[var(--gray3)]"
    >
      <ProgressPrimitive.Indicator
        style={{ width: `${value}%` }}
        className="h-full bg-[var(--gray7)] duration-300 ease-in-out"
      />
    </ProgressPrimitive.Root>
  );
};

export default Progress;
