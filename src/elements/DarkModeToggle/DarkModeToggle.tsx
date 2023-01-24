import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

import { useMemo } from 'react';

const DarkModeToggle = ({
  value,
  onChange,
  size = 5,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
  size?: 5 | 6 | 8;
}) => {
  const sizeClass = useMemo(() => `h-${size} w-${size}`, [size]);
  return (
    <div
      className="relative flex cursor-pointer flex-row items-center
     justify-between rounded-full bg-[var(--gray3)] px-1 text-[var(--gray11)]"
      onClick={() => onChange(!value)}
    >
      <div
        className={`absolute z-0 box-content ${sizeClass} rounded-full 
        bg-[var(--primary)] p-2 transition-all ${
          value === false ? 'translate-x-0' : 'translate-x-full'
        }`}
      ></div>
      <div className={`relative z-10 rounded-full p-2`}>
        <SunIcon
          className={`${sizeClass} ${value === false ? 'text-white' : ''}`}
        />
      </div>
      <div className={`relative z-10 rounded-full p-2`}>
        <MoonIcon
          className={`${sizeClass} ${value === true ? 'text-white' : ''}`}
        />
      </div>
    </div>
  );
};

export default DarkModeToggle;
