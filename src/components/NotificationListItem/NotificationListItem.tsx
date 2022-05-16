import React, { useState, useCallback, FC } from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'

import './NotificationListItem.scss'

import Button from '../../components/UI/Button'

import { INotification } from '../../types/generalTypes'
import { TodosEvents } from '../../types/generalTypes'
import { sendTodeleteNotification } from '../../store/actions/user'

import { getShorterText } from '../../helpers'

interface NotificationListItemProps {
  notification: INotification
}

export const NotificationListItem: FC<NotificationListItemProps> = ({
  notification
}) => {
  const [isButtonActive, setButtonActive] = useState(false)

  const dispatch = useDispatch()

  const handleRemoveNotification = useCallback(() => {
    dispatch(sendTodeleteNotification(notification.id))
  }, [])

  const handleMouseEnter = useCallback(() => {
    setButtonActive(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setButtonActive(false)
  }, [])

  const { type, message } = notification

  return (
    <li
      className={clsx(
        'notifications__list-item',
        `notifications__list-item--${type}`
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <p className='notifications__list-item-title'>{TodosEvents[type]}</p>
        <p className='notifications__list-item-subtitle'>
          {getShorterText(message.label, 20)}
        </p>
      </div>
      <Button
        className={clsx('delete-btn', isButtonActive && 'delete-btn--active')}
        onClick={handleRemoveNotification}
      />
    </li>
  )
}
