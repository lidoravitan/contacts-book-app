import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Contact } from '../../commons/types'

type EditContactState = {
  contact: Contact
}

export const editContactSlice = createSlice({
  name: 'editContact',
  initialState: {} as EditContactState,
  reducers: {
    setEditeContact: (state, action: PayloadAction<Contact>) => {
      state.contact = action.payload
    },
  },
})

export const { setEditeContact } = editContactSlice.actions
