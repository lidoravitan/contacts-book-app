import { configureStore } from '@reduxjs/toolkit'
import { api } from './api'
import { editContactSlice } from './slices/editContactSlice'

export const createstore = () =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      editContact: editContactSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  })

type StoreType = ReturnType<typeof createstore>
export type AppState = StoreType['getState']
export type AppDispatch = StoreType['dispatch']
