import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { appConfig } from '../appConfig'
import { Contact } from '../types'

export const handlers = [
  http.get(`${appConfig.BASE_URL}/contacts`, () => {
    return HttpResponse.json<Contact[]>([
      { id: '1', name: 'Jhon', email: 'email-address', phone: 'phone-number', address: 'home-address' },
    ])
  }),
]

export const server = setupServer(...handlers)
