import { FC, useLayoutEffect } from 'react'
import { SidebarUser } from '../SidebarUser/SidebarUser'
import { getUsers, useGetUsersList } from '@/entities/Users'
import { useSelector } from 'react-redux'
import { IUser } from '@/entities/User'
import { Flex, Spin, Typography } from 'antd'
import cls from './SidebarUserList.module.css'
import classNames from 'classnames'
import { getSelectedChatId } from '@/features/Chat/model/selectors/getSelectedChatId'

export const SidebarUserList: FC = () => {
  const [getUsersMutation, { isLoading }] = useGetUsersList()
  const userList = useSelector(getUsers)
  const selectedChatId = useSelector(getSelectedChatId)

  useLayoutEffect(() => {
    getUsersMutation({})
  }, [getUsersMutation])

  if (userList.length === 0 && !isLoading) {
    return (
      <Flex vertical gap="middle" className={classNames(cls.SidebarUserList, cls.center)}>
        <Typography.Text ellipsis>Не нашли ни одного пользователя</Typography.Text>
      </Flex>
    )
  }

  return (
    <div className={cls.SidebarUserListWrapper}>
      <Flex vertical gap="middle" className={classNames(cls.SidebarUserList, { [cls.center]: isLoading })}>
        {isLoading ? (
          <Spin />
        ) : (
          userList.map((user: IUser['user']) => {
            const { email, id, isActivated } = user
            const isSelected = selectedChatId === id

            return <SidebarUser key={id} email={email} isActivated={isActivated} isSelected={isSelected} userId={id} />
          })
        )}
      </Flex>
    </div>
  )
}
