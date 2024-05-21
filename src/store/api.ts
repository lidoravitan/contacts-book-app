import { createApi } from '@reduxjs/toolkit/query/react'

import { toast } from 'react-toastify'
import { Contact } from '../commons/types'
import { customFetchQuery } from './customFetchQuery'
import { appConfig } from '../commons/appConfig'
import { getContactsMachine } from '../machines/getContacts.machine'

export const api = createApi({
  reducerPath: 'contacts',
  baseQuery: customFetchQuery({ baseUrl: appConfig.BASE_URL }),
  endpoints: (builder) => ({
    getContacts: builder.query<Contact[], void>({
      query: () => `/contacts`,
      async onQueryStarted(_, { queryFulfilled }) {
        const { transition } = getContactsMachine
        try {
          transition('fetch')
          await queryFulfilled
          transition('resolve')
        } catch {
          transition('reject')
        }
      },
    }),

    addContact: builder.mutation<Contact, Contact>({
      query: (body) => ({
        url: `/contacts`,
        method: 'POST',
        body,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        // Optimistic-UI - update the cache with the new contact
        const patchResult = dispatch(
          api.util.updateQueryData('getContacts', undefined, (draft) => {
            draft?.push({ id: id.toString(), ...patch })
          }),
        )

        try {
          await queryFulfilled
          toast.success('Contact added successfully')
        } catch {
          // Undo the cache update on failure
          patchResult.undo()
          toast.error('Failed to add contact')
          /**
           * Alternatively, on failure you can invalidate the corresponding cache tags
           * to trigger a re-fetch:
           * dispatch(api.util.invalidateTags(['Contacts']))
           */
        }
      },
    }),
    deleteContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData('getContacts', undefined, (draft) => {
            const index = draft?.findIndex((contact) => contact.id === id)
            if (index !== -1) {
              draft?.splice(index, 1)
            }
          }),
        )

        try {
          await queryFulfilled
          toast.success('Contact deleted successfully')
        } catch {
          patchResult.undo()
          toast.error('Failed to delete contact')
        }
      },
    }),
    updateContact: builder.mutation<Contact, Partial<Contact> & { id: string }>({
      query: ({ id, ...patch }) => ({
        url: `/contacts/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          toast.success('Contact updated successfully')
          dispatch(
            api.util.updateQueryData('getContacts', undefined, (draft) => {
              const contact = draft?.find((contact) => contact.id === id)
              if (contact) Object.assign(contact, { ...patch, id })
            }),
          )
        } catch {
          toast.error('Failed to update contact')
        }
      },
    }),
  }),
})

export const { useGetContactsQuery, useAddContactMutation, useUpdateContactMutation, useDeleteContactMutation } = api
