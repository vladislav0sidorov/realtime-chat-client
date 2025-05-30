import { createSlice } from '@reduxjs/toolkit'

import { IChatSchema } from '../types/chatSchema'
import { getChatHistory } from '../services/getChatHistory/getChatHistory'

const initialState: IChatSchema = {
  isLoading: false,
  messageContent: '',
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatData: (state, action) => {
      state.chatData = action.payload
    },
    setErrorData: (state, action) => {
      state.errors = action.payload
    },
    addMessage: (state, action) => {
      state.chatData = [
        ...(state.chatData || []),
        action.payload
      ]
    },
    setMessageContent: (state, action) => {
      state.messageContent = action.payload
    },
    resetMessageContent: state => {
      state.messageContent = ''
    },
    setSelectedChatId: (state, action) => {
      state.selectedChatId = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        getChatHistory.endpoints.getChatHistory.matchPending,
        state => {
          state.isLoading = true
        }
      )
      .addMatcher(
        getChatHistory.endpoints.getChatHistory.matchFulfilled,
        state => {
          state.isLoading = false
        }
      )
      .addMatcher(
        getChatHistory.endpoints.getChatHistory.matchRejected,
        state => {
          state.isLoading = false
        }
      )
  }
})

export const { actions: chatActions } = chatSlice
export const { reducer: chatReducer } = chatSlice
