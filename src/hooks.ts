import { useEffect, useMemo, useState } from 'react';
import { singletonHook } from 'react-singleton-hook';

// to be moved to app context

export const useTheme = singletonHook(
  {
    darkMode: false,
    setDarkMode: () => {},
  },
  () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
      document.documentElement.classList[darkMode ? 'add' : 'remove'](
        'dark-theme',
      );
    }, [darkMode]);

    return {
      darkMode,
      setDarkMode,
    };
  },
);
