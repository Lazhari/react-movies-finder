import React from 'react'
import { render, fireEvent } from '../testUtils'
import Upcoming from '../../pages/upcoming'

describe('Upcoming page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Upcoming />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  // it('clicking button triggers alert', () => {
  //   const { getByText } = render(<Home />, {})
  //   window.alert = jest.fn()
  //   // fireEvent.click(getByText('Test Button'))
  //   // expect(window.alert).toHaveBeenCalledWith('With typescript and Jest')
  // })
})
