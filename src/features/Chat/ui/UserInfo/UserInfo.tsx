import { Flex, Typography } from 'antd'
import { FC } from 'react'

import { ReturnToPreviousPageButton } from '@/features/ReturnToPreviousPageButton'
import { IUser } from '@/entities/User'

interface UserInfoProps {
  currentUser: IUser['user']
}

export const UserInfo: FC<UserInfoProps> = props => {
  const { currentUser } = props

  return (
    <Flex gap={8} align="center">
      <ReturnToPreviousPageButton />
      <Flex vertical gap={4}>
        <Typography.Text>{currentUser?.email ?? '—'}</Typography.Text>
        <Typography.Text ellipsis type="secondary">
          {currentUser?.isActivated ? 'Учетная запись активирована' : 'Учетная запись не активирована'}
        </Typography.Text>
      </Flex>
    </Flex>
  )
}
