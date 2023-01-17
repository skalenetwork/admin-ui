import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { tw } from 'twind';

enum Variant {
  Circle,
  Rounded,
}

type Props = {
  name: `${string}.eth` | `0x${string}` | string;
  variant?: Variant;
  isOnline?: boolean;
};

const Avatar = ({ name, variant = Variant.Circle, isOnline }: Props) => {
  return (
    <AvatarPrimitive.Root className="relative inline-flex h-10 w-10">
      <AvatarPrimitive.Image
        alt="Avatar"
        className={tw(
          'h-full w-full object-cover',
          {
            [Variant.Circle]: 'rounded-full',
            [Variant.Rounded]: 'rounded',
          }[variant],
        )}
      />
      {isOnline && (
        <div
          className={tw(
            'absolute bottom-0 right-0 h-2 w-2',
            {
              [Variant.Circle]: '-translate-x-1/2 -translate-y-1/2',
              [Variant.Rounded]: '',
            }[variant],
          )}
        >
          <span className="block h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
      )}
      <AvatarPrimitive.Fallback
        className={tw(
          'flex h-full w-full items-center justify-center bg-[var(--gray4)]',
          {
            [Variant.Circle]: 'rounded-full',
            [Variant.Rounded]: 'rounded',
          }[variant],
        )}
        delayMs={600}
      >
        <span className="text-sm font-medium text-[var(--gray10)]">
          {name.slice(0, 2) === '0x'
            ? name.slice(2, 4)
            : (name.slice(0, 2) || '').toUpperCase()}
        </span>
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
};

Avatar.variant = Variant;
export default Avatar;
