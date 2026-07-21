import { fireEvent, render, screen } from '@testing-library/react'
import EventBody, { type EventType } from './EventBody'

const event: EventType = {
  title: 'Test event',
  start: '2099-01-01T10:00:00.000Z',
  end: '2099-01-01T11:00:00.000Z',
  isPrivate: false,
  isPetFriendly: false,
  description: '',
  createdById: '',
}

describe('EventBody', () => {
  it('renders and updates the pet-friendly option', () => {
    const onChangeValue = jest.fn()

    render(
      <EventBody
        event={event}
        onChangeValue={onChangeValue}
        onValidate={jest.fn()}
      />,
    )

    const checkbox = screen.getByLabelText('Pet friendly')
    fireEvent.click(checkbox)

    expect(onChangeValue).toHaveBeenCalledWith('isPetFriendly', true)
  })
})
