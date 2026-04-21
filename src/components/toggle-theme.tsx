import React from 'react';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from 'lucide-react';

function ToggleTheme() {
  const { setTheme, theme } = useTheme();
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? (
          <SunIcon className="size-6" />
        ) : (
          <MoonIcon className="size-6" />
        )}
      </Button>
    </>
  );
}

export default ToggleTheme;
