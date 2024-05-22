import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { HttpResponse, http } from 'msw'
import { ContactList } from '..'
import { AppProviders } from '../../../AppProviders'
import { server } from '../../../commons/tests/server'

describe('ContactList', () => {
  beforeAll(() => server.listen())

  afterAll(() => server.close())

  it('should render a list of contacts with expected columns', async () => {
    render(
      <AppProviders>
        <ContactList />
      </AppProviders>,
    )

    await waitForElementToBeRemoved(() => screen.getByText(/No data/i))

    expect(screen.getByText(/Jhon/i)).toBeInTheDocument()
    expect(screen.getByText(/phone-number/i)).toBeInTheDocument()
    expect(screen.getByText(/email-address/i)).toBeInTheDocument()
    expect(screen.getByText(/home-address/i)).toBeInTheDocument()
  })

  it('should render a message when there are no contacts', async () => {
    server.use(
      http.get('/*', () => {
        return HttpResponse.error()
      }),
    )

    render(
      <AppProviders>
        <ContactList />
      </AppProviders>,
    )

    expect(screen.getByText(/No Data/i)).toBeInTheDocument()
  })
})
