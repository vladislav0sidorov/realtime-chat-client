import { chatActions, getMessageContent } from '@/features/Chat'
import { useChatSocket } from '@/shared/lib/hooks/useChatSocket'
import { SendOutlined } from '@ant-design/icons'
import { Button, Flex } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

interface UserMessageInputProps {
  recipientId?: string
}

export const UserMessageInput: FC<UserMessageInputProps> = props => {
  const { recipientId } = props

  const dispatch = useDispatch()
  const messageContent = useSelector(getMessageContent)
  // const notificationApi = useNotificationApi()
  // const [sendMessageMutation, { isLoading }] = useSendMessage()
  const { sendMessage } = useChatSocket(recipientId || '')

  const sendMessageHandler = (content: string) => {
    dispatch(chatActions.resetMessageContent())
    sendMessage(content.trim())
  }

  // const sendMessage = () => {
  //   if (!messageContent.trim() || !recipientId) {
  //     return
  //   }

  //   try {
  //     sendMessageMutation({
  //       recipientId,
  //       content: messageContent.trim()
  //     }).unwrap()
  //   } catch (error: any) {
  //     console.log(error)

  //     const { data } = error

  //     notificationApi.error({
  //       message: 'Ошибка при отправке сообщения',
  //       description: `Код ошибки: ${data.status ?? error.originalStatus}. ${data.message ? data.message : ''}`,
  //       showProgress: true
  //     })
  //     console.error('Failed to send message:', error)
  //   }
  // }

  if (!recipientId) {
    return null
  }

  return (
    <Flex vertical gap={8}>
      <Flex gap={8} align="center">
        <TextArea
          value={messageContent}
          onChange={e => dispatch(chatActions.setMessageContent(e?.target.value))}
          onPressEnter={e => {
            e.preventDefault()
            sendMessageHandler(messageContent)
          }}
          placeholder="Напишите сообщение..."
          autoSize
        />
        <Button onClick={() => sendMessageHandler(messageContent)} type="primary">
          <SendOutlined />
        </Button>
      </Flex>
    </Flex>
  )
}
