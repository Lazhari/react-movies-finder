import React from 'react'
import { render } from '@testing-library/react'

import { useStore } from '../src/store'
import theme from '../src/theme'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles'

const Providers: React.ComponentType = ({ children }) => {
  const store = useStore({})

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  )
}

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
