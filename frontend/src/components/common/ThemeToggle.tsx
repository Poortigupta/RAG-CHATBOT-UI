import { useEffect, useState } from 'react';
import { RiMoonClearLine, RiSunLine } from 'react-icons/ri';

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark'); else root.classList.remove('dark');
  }, [dark]);

  return (
    <button
      type="button"
      onClick={()=>setDark(d=>!d)}
      className="p-2 rounded-md bg-neutral-200/60 dark:bg-neutral-700/60 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
      aria-label="Toggle theme"
    >
      {dark ? <RiSunLine className="text-amber-400" /> : <RiMoonClearLine />}
    </button>
  );
}
