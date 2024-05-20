import { configureStore } from '@reduxjs/toolkit'
import { api } from './api'
import { editContactSlice } from './slices/editContactSlice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    editContact: editContactSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
