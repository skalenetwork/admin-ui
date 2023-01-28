import { tw } from 'twind';

type Props = {
  className?: string;
  value?: string;
};

const Button = ({ className, value }: Props) => {
  return <button className={tw('btn', className)}>{value}</button>;
};
