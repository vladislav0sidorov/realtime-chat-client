import { StateSchema } from '@/app/providers/StoreProvider'

export const getSelectedChatId = (state: StateSchema) => state?.chat.selectedChatId
