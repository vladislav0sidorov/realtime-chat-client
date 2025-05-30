import { StateSchema } from '@/app/providers/StoreProvider'

export const getChatErrors = (state: StateSchema) => state?.chat.errors
