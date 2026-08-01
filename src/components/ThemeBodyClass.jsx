import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectTheme } from '../store/selectors'

const ThemeBodyClass = () => {
  const theme = useSelector(selectTheme)

  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark')
    document.body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light')
    return () => {
      document.body.classList.remove('theme-light', 'theme-dark')
    }
  }, [theme])

  return null
}

export default ThemeBodyClass
