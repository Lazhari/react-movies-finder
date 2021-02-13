import { useEffect, FC, ReactElement } from 'react'

interface Props {
  children: ReactElement
}

const ScrollToTop: FC<Props> = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return children
}

export default ScrollToTop
