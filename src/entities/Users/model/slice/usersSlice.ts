import { createSlice } from '@reduxjs/toolkit'
import { IUsersSchema } from '../types/users.types'

const initialState: IUsersSchema = {
  users: []
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersData: (state, action) => {
      state.users = action.payload
    },
    setErrorData: (state, action) => {
      state.errors = action.payload
    },
  }
})

export const { actions: usersActions } = usersSlice
export const { reducer: usersReducer } = usersSlice
