import { useTheme } from '@/context/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex justify-end p-4 border-b dark:border-gray-700">
      <button
        onClick={toggleTheme}
        className="px-4 py-2 border rounded bg-gray-100 dark:bg-gray-800 dark:text-white"
      >
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
    </header>
  );
}
