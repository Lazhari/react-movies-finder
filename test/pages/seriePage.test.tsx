import React from 'react'
import { render } from '../testUtils'
import TvPage from '../../pages/series/[id]'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/series/69050',
      pathname: '',
      query: '',
      asPath: '',
    }
  },
}))

describe('TV show page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<TvPage />, {})
    expect(asFragment()).toMatchSnapshot()
  })
})
