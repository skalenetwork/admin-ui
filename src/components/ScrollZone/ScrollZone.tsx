import * as ScrollArea from '@radix-ui/react-scroll-area';
import { tw } from 'twind';
import './_style.css';

type Props = React.PropsWithChildren & {
  className?: string;
  grow?: boolean;
};

export default function ScrollZone({
  children,
  className,
  grow = false,
}: Props) {
  const maybeGrowClass = grow ? 'h-full w-full' : '';
  return (
    <ScrollArea.Root className={`${maybeGrowClass} ${tw`${className}`}`}>
      <ScrollArea.Viewport className={`${maybeGrowClass} relative`}>
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="ScrollAreaScrollbar"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="ScrollAreaThumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className="ScrollAreaScrollbar"
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="ScrollAreaThumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="ScrollAreaCorner" />
    </ScrollArea.Root>
  );
}
