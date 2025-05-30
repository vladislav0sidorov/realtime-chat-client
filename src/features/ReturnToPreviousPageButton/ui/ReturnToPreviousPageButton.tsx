import { LeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { FC } from 'react'

export const ReturnToPreviousPageButton: FC = () => {
  const handleClick = () => {
    window.history.back()
  }

  return (
    <Button type="text" onClick={handleClick}>
      <LeftOutlined />
    </Button>
  )
}
