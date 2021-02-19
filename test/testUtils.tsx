import React from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'

import { wrapper } from '@src/store'
import theme from '@src/theme'
import { ThemeProvider } from '@material-ui/core/styles'

const Providers: React.ComponentType = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

const customRender = (
  ui: React.ReactElement,
  options: RenderOptions = {}
): RenderResult =>
  render(ui, { wrapper: wrapper.withRedux(Providers), ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
