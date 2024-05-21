import { render, screen } from '@testing-library/react'
import { ContactList } from '..'
import { AppProviders } from '../../../AppProviders'
import { failureServer } from '../../../commons/tests/server'

// https://github.com/mswjs/msw/issues/694#issuecomment-820564344

describe('ContactList - Testing Error Handling in ContactList Componen', () => {
  beforeAll(() => failureServer.listen())
  beforeEach(() => failureServer.resetHandlers())
  afterAll(() => failureServer.close())

  it('should render a message when there are no contacts', async () => {
    render(
      <AppProviders>
        <ContactList />
      </AppProviders>,
    )

    expect(screen.getByText(/No Data/i)).toBeInTheDocument()
  })
})
