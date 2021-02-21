import React from 'react'
import { render } from '../testUtils'
import Genre from '../../pages/genres/[...genre]'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/genres/12/Adventure',
      pathname: '',
      query: '',
      asPath: '',
    }
  },
}))

describe('Genre page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Genre />, {})
    expect(asFragment()).toMatchSnapshot()
  })
})
