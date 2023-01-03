import { useEffect, useState } from 'react';
import SunIcon from '@heroicons/react/outline/SunIcon';
import MoonIcon from '@heroicons/react/outline/MoonIcon';

type Props = {
  default: 'light' | 'dark';
  value: { light: string; dark: string };
};

const DarkModeToggle = (props: Props) => {
  const [mode, setMode] = useState(props.value[props.default]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  return (
    <div className="bg-base-200 border-base-200 relative flex cursor-pointer flex-row items-center justify-between rounded-full border-4">
      <div
        className={`bg-base-content absolute  z-0 box-content h-5 w-5 rounded-full p-2 transition-all ${
          mode === THEME.DAY ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        .
      </div>
      <div
        className={`relative z-10 rounded-full p-2`}
        onClick={() => setMode(THEME.DAY)}
      >
        <SunIcon
          className={`h-5 w-5 ${mode === THEME.DAY ? 'text-base-100' : ''}`}
        />
      </div>
      <div
        className={`relative z-10 rounded-full p-2`}
        onClick={() => setMode(THEME.NIGHT)}
      >
        <MoonIcon
          className={`h-5 w-5 ${mode === THEME.NIGHT ? 'text-base-100' : ''}`}
        />
      </div>
    </div>
  );
};

export default DarkModeToggle;
