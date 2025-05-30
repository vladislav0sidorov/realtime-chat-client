import { StateSchema } from '@/app/providers/StoreProvider'

export const getChatData = (state: StateSchema) => state?.chat.chatData
