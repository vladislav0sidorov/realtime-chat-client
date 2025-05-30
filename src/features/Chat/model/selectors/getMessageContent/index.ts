import { StateSchema } from '@/app/providers/StoreProvider'

export const getMessageContent = (state: StateSchema) => state?.chat.messageContent
