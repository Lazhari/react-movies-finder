import React from 'react'
import { render } from '../testUtils'
import SeriesPage from '../../pages/series'

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<SeriesPage />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  // it('clicking button triggers alert', () => {
  //   const { getByText } = render(<Home />, {})
  //   window.alert = jest.fn()
  //   // fireEvent.click(getByText('Test Button'))
  //   // expect(window.alert).toHaveBeenCalledWith('With typescript and Jest')
  // })
})
