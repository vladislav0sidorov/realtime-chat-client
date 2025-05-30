import { IMessage } from "@/entities/Message";

export interface IChatSchema {
  selectedChatId?: string;
  chatData?: IMessage[];
  isLoading?: boolean;
  messageContent: string;
  errors?: string | unknown | null | undefined
}
