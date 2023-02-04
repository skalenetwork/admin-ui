import { SunIcon } from '@heroicons/react/24/solid';
import { MoonIcon } from '@radix-ui/react-icons';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { tw } from 'twind';

const DarkModeToggle = ({
  value = true,
  onChange,
  size = 4,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
  size?: 4 | 5 | 6 | 8;
}) => {
  const sizeClass = useMemo(() => `h-${size} w-${size}`, [size]);
  const [animateClass, setAnimateClass] = useState('');

  const change = useCallback(() => {
    onChange(!value);
    setAnimateClass(value ? 'rotate-[6deg]' : '-rotate-[6deg]');
  }, [value, animateClass, onChange]);

  useEffect(() => {
    animateClass &&
      window.setTimeout(() => {
        setAnimateClass('');
      }, 300);
  }, [animateClass]);

  return (
    <div
      className={tw`${animateClass} relative flex cursor-pointer flex-row items-center justify-between
     rounded-full bg-[var(--gray3)] p-1 text-[var(--gray11)] transition-all`}
      onClick={() => change()}
    >
      <div
        className={`absolute z-0 box-content ${sizeClass} rounded-full 
        bg-[var(--primary)] p-2 transition-all ${
          value === false ? 'translate-x-0' : 'translate-x-full'
        }`}
      ></div>
      <div
        className={`flex-center relative z-10 flex justify-center rounded-full p-2`}
      >
        <SunIcon
          className={`${sizeClass} ${value === false ? 'text-white' : ''}`}
        />
      </div>
      <div
        className={`relative z-10 flex items-center justify-center rounded-full p-2`}
      >
        <MoonIcon
          className={`-scale-x-[1] ${sizeClass} ${
            value === true ? 'text-white' : ''
          }`}
        />
      </div>
    </div>
  );
};

export default DarkModeToggle;
