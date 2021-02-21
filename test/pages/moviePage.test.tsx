import React from 'react'
import { render } from '../testUtils'
import Movie from '../../pages/movies/[mid]'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/movies/464052',
      pathname: '',
      query: '',
      asPath: '',
    }
  },
}))

describe('Movie page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Movie />, {})
    expect(asFragment()).toMatchSnapshot()
  })
})
