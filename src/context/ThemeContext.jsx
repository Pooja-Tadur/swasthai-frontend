import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.style.setProperty('--bg', dark ? '#0F1117' : '#FDF6F4')
    document.documentElement.style.setProperty('--bg2', dark ? '#1A1F2E' : '#FBF0EC')
    document.documentElement.style.setProperty('--card', dark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)')
    document.documentElement.style.setProperty('--text', dark ? '#F5F1E8' : '#2E1F24')
    document.documentElement.style.setProperty('--text2', dark ? '#A88B92' : '#6B4F56')
    document.documentElement.style.setProperty('--border', dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.9)')
  }, [dark])

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)