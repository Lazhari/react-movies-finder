import React from 'react'
import { render } from '../testUtils'
import NotFound from '../../pages/404'

describe('404 page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<NotFound />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  // it('clicking button triggers alert', () => {
  //   const { getByText } = render(<Home />, {})
  //   window.alert = jest.fn()
  //   // fireEvent.click(getByText('Test Button'))
  //   // expect(window.alert).toHaveBeenCalledWith('With typescript and Jest')
  // })
})
