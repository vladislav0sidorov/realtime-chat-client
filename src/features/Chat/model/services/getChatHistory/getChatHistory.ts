import { rtkApi } from '@/shared/api/rtkApi'
import { chatActions } from '../../slice/chatSlice'

export const getChatHistory = rtkApi.injectEndpoints({
  endpoints: build => ({
    getChatHistory: build.mutation<void, { recipientId: string }>({
      query: ({ recipientId }) => ({
        url: `/chat/${recipientId}`,
        method: 'GET'
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(chatActions.setChatData(data))
        } catch (errors: any) {
          dispatch(chatActions.setErrorData(errors?.error.data))
          console.error('Getting chat error:', errors)
        }
      }
    })
  })
})

export const useGetChatHistory = getChatHistory.useGetChatHistoryMutation
