import { Card, Flex, Typography } from 'antd'
import { FC, useEffect } from 'react'

import cls from './ChatPage.module.css'
import classNames from 'classnames'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUsers } from '@/entities/Users'
import { getUserAuthData } from '@/entities/User'
import { chatActions, useGetChatHistory, UserChat, UserInfo, UserMessageInput } from '@/features/Chat'
import { useDispatch } from 'react-redux'

const ChatPage: FC = () => {
  const { id } = useParams()

  const dispatch = useDispatch()
  const user = useSelector(getUserAuthData)
  const users = useSelector(getUsers)
  const currentUser = users.find(user => id?.includes(user.id))
  const [getChatHistoryMutation] = useGetChatHistory()

  useEffect(() => {
    if (!id || !user) {
      return
    }

    dispatch(chatActions.setSelectedChatId(id))
    dispatch(chatActions.resetMessageContent())
    getChatHistoryMutation({ recipientId: id })
  }, [id, getChatHistoryMutation, user, dispatch])

  return currentUser ? (
    <Card
      styles={{
        body: {
          height: '100%'
        }
      }}
      className={cls.ChatPage}
    >
      <Flex vertical style={{ height: '100%' }} gap={16}>
        <UserInfo currentUser={currentUser} />
        <div className={classNames(cls.devider)} />
        <UserChat />
        <div className={classNames(cls.devider)} />
        <UserMessageInput recipientId={id} />
      </Flex>
    </Card>
  ) : (
    <Card
      className={classNames(cls.ChatPage)}
      styles={{
        body: {
          height: '100%'
        }
      }}
    >
      <Flex className={cls.noChat} align="center" justify="center">
        <Typography.Text>Не нашли чат с выбранным пользователем</Typography.Text>
      </Flex>
    </Card>
  )
}

export default ChatPage
