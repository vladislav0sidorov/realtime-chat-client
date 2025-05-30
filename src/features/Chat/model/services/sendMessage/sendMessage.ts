import { rtkApi } from '@/shared/api/rtkApi'
import { chatActions } from '../../slice/chatSlice'

const sendMessage = rtkApi.injectEndpoints({
  endpoints: build => ({
    sendMessage: build.mutation<void, { recipientId: string; content: string }>({
      query: ({ recipientId, content }) => ({
        url: `/chat/${recipientId}`,
        method: 'POST',
        body: {
          content
        }
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          dispatch(chatActions.addMessage(data))
          dispatch(chatActions.resetMessageContent())
        } catch (errors: any) {
          console.error('Send message error:', errors)
        }
      }
    })
  })
})

export const useSendMessage = sendMessage.useSendMessageMutation
