import { fetchBaseQuery } from '@reduxjs/toolkit/query'

import { ConnectivityStates } from '../machines/connectivity.machine'

// wait function
export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Implement a custom fetch query that simulates a server error and delay requests
export function customFetchQuery({ baseUrl }: { baseUrl: string }) {
  const baseQuery = fetchBaseQuery({ baseUrl })

  return async function (...args) {
    const connectivity = localStorage.getItem('connectivity')
    const isOnline = connectivity !== null && connectivity === ConnectivityStates.CONNECTED
    await wait(30000)
    if (isOnline) {
      return baseQuery(...args)
    } else {
      throw new Error('Dummy! Server Error')
    }
  } as ReturnType<typeof fetchBaseQuery>
}
