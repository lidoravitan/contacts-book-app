import { render, screen } from '@testing-library/react'
import { ContactList } from '..'
import { AppProviders } from '../../../AppProviders'
import { server } from '../../../commons/tests/server'

describe('ContactList', () => {
  beforeAll(() => server.listen())
  beforeEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('should render a list of contacts with expected columns', async () => {
    render(
      <AppProviders>
        <ContactList />
      </AppProviders>,
    )

    expect(await screen.findByText(/Jhon/i)).toBeInTheDocument()
    expect(await screen.findByText(/phone-number/i)).toBeInTheDocument()
    expect(await screen.findByText(/email-address/i)).toBeInTheDocument()
    expect(await screen.findByText(/home-address/i)).toBeInTheDocument()
  })

  it('should render a message when there are no contacts', async () => {
    server.close()

    render(
      <AppProviders>
        <ContactList />
      </AppProviders>,
    )

    expect(await screen.findByText(/No data/i)).toBeInTheDocument()
  })
})
