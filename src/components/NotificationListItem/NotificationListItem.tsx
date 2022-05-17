import React, { useState, useCallback, FC, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'

import './NotificationListItem.scss'

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
  const [isDeleting, setDeleting] = useState(false)
  const liElement = useRef(null)

  useEffect(() => {
    if (liElement.current !== null) {
      const li = liElement.current as HTMLLIElement
      li.addEventListener('animationend', animationEndHandler)

      return () => li.removeEventListener('animationend', animationEndHandler)
    }
    return
  }, [])

  const dispatch = useDispatch()

  const handleRemoveNotification = useCallback(() => {
    setDeleting(true)
  }, [])

  const animationEndHandler = () => {
    dispatch(sendTodeleteNotification(notification.id))
  }

  const { type, message } = notification

  return (
    <div className='container'>
      <li
        ref={liElement}
        className={clsx(
          'notifications__list-item',
          `notifications__list-item--${type}`,
          isDeleting && 'notifications__list-item--deleting'
        )}
      >
        <div>
          <p className='notifications__list-item-title'>{TodosEvents[type]}</p>
          <p className='notifications__list-item-subtitle'>
            {getShorterText(message.label, 20)}
          </p>
        </div>
        <button onClick={handleRemoveNotification}>delete</button>
      </li>
    </div>
  )
}
