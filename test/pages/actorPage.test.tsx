import React from 'react'
import { render } from '../testUtils'
import Actor from '../../pages/actors/[id]'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/actors/90633',
      pathname: '',
      query: '',
      asPath: '',
    }
  },
}))

describe('Actor page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Actor />, {})
    expect(asFragment()).toMatchSnapshot()
  })
})
