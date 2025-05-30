import { Card, Flex, Typography } from 'antd'
import { FC } from 'react'
import cls from './SidebarUser.module.css'
import { getUserAuthData, IUser } from '@/entities/User'
import { useNavigate } from 'react-router-dom'
import { getRouteChat } from '@/shared/consts/router'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { getIsLoading } from '@/features/Chat/model/selectors/getIsLoading'

interface SidebarUserProps {
  email: IUser['user']['email']
  isActivated: IUser['user']['isActivated']
  userId: IUser['user']['id']
  isSelected: boolean
}

export const SidebarUser: FC<SidebarUserProps> = props => {
  const { email, isActivated, userId, isSelected } = props
  const user = useSelector(getUserAuthData)
  const navigate = useNavigate()
  const isChatLoading = useSelector(getIsLoading)

  const moveToChatPage = () => {
    if (isChatLoading) {
      return
    }

    if (!user?.user.id) {
      return
    }

    navigate(getRouteChat(userId))
  }

  return (
    <Card
      size="small"
      className={classNames(cls.SidebarUser, { [cls.isSelectedUser]: isSelected, [cls.isCardDisabled]: isChatLoading })}
      onClick={moveToChatPage}
    >
      <Flex vertical gap={8} className={cls.userInfo}>
        <Typography.Text className={cls.email} ellipsis>
          {email}
        </Typography.Text>
        <Typography.Text className={cls.isActivated} ellipsis type="secondary">
          {isActivated ? 'Учетная запись активирована' : 'Учетная запись не активирована'}
        </Typography.Text>
      </Flex>
    </Card>
  )
}
