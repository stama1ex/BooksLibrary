interface ThemeToggleButtonProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  darkMode,
  setDarkMode,
}) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed top-4 right-4 p-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white cursor-pointer shadow-md transition-colors duration-500"
      aria-label="Toggle dark mode"
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggleButton;
