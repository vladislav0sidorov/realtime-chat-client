import { Card, Flex, Spin, Typography } from 'antd'
import { FC, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { getIsLoading } from '../../model/selectors/getIsLoading'
import { getChatData } from '../../model/selectors/getChatData'

import cls from './UserChat.module.css'
import classNames from 'classnames'
import { IMessage } from '@/entities/Message'
import { useParams } from 'react-router-dom'

export const UserChat: FC = () => {
  const { id } = useParams()
  const isChatLoading = useSelector(getIsLoading)
  const chatData: IMessage[] | [] = useSelector(getChatData) ?? []
  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      block: 'end'
    })
  }, [id, isChatLoading])

  if (isChatLoading || !id) {
    return <Spin className={cls.loaderSpinner} />
  }

  if (chatData.length > 0) {
    return (
      <div className={cls.chatWrapper}>
        <div className={cls.chatList}>
          <Flex style={{ marginTop: 'auto' }} justify="end" vertical gap={8}>
            <div ref={topRef} />
            {chatData.map(chatMessage => {
              const { createdAt, content, sender } = chatMessage
              const isSenderMessage = id !== sender
              const formattedTime = new Date(createdAt).toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit'
              })

              return (
                <Card
                  key={createdAt}
                  className={classNames(cls.messageCard, { [cls.senderMessageCard]: isSenderMessage })}
                  styles={{
                    body: {
                      padding: 12
                    }
                  }}
                >
                  <Flex
                    style={{
                      flexDirection: isSenderMessage ? 'row' : 'row-reverse'
                    }}
                    gap={6}
                  >
                    <Typography.Text className={classNames({ [cls.senderMessageText]: isSenderMessage })}>{content}</Typography.Text>
                    <Typography.Text className={classNames(cls.messageTime, { [cls.senderMessageTime]: isSenderMessage })}>
                      {formattedTime}
                    </Typography.Text>
                  </Flex>
                </Card>
              )
            })}
            <div ref={bottomRef} />
          </Flex>
        </div>
      </div>
    )
  } else {
    return (
      <Flex className={cls.noMessageBlock}>
        <Typography.Title level={4}>Поздаровайтесь! 👋</Typography.Title>
      </Flex>
    )
  }
}
