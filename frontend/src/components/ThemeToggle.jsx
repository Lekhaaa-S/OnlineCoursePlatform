import { useTheme } from '../context/ThemeContext'
import { HiSun, HiMoon } from 'react-icons/hi'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme}
      className="p-2 text-text-700 hover:text-text-950 rounded-lg hover:bg-background-200/60 transition-all duration-300 active:scale-95"
      aria-label="Toggle theme">
      {theme === 'dark' ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
    </button>
  )
}

export default ThemeToggle
