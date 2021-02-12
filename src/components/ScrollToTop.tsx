import React, { useEffect } from 'react'

const ScrollToTop: React.FC = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return children
}

export default ScrollToTop
