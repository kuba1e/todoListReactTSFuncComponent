import React, { useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'

import { TodosEvents } from '../../types/generalTypes'

import './Notification.scss'

import { useTypedSelector } from '../../hooks/useTypedSelector'
import { userSelector } from '../../store/selectors'

export const Notification = () => {
  const { notifications, isWebSocketConnected } = useTypedSelector(userSelector)

  const [isActiveList, setActiveList] = useState(false)

  useEffect(() => {
    document.addEventListener('click', handleHideList)
    return () => document.removeEventListener('click', handleHideList)
  }, [isActiveList])

  const handleShowList = useCallback(() => {
    setActiveList((isActiveList) => (isActiveList = !isActiveList))
  }, [])

  const handleHideList = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.notifications') && isActiveList) {
        setActiveList(false)
      }
    },
    [isActiveList]
  )

  const countWidget = notifications.length ? (
    <span className={clsx('notifications__widget-count')}>
      {notifications.length}
    </span>
  ) : null

  return (
    <div className='notifications' onClick={handleShowList}>
      <div className='notifications__inner'>
        <div className='notifications__widget'>{countWidget}</div>
        <div className='notifications__messages'>
          <ul
            className={clsx(
              'notifications__list',
              isActiveList && 'notifications__list--active'
            )}
          >
            {notifications.map((notification) => {
              return (
                <li
                  className={clsx(
                    'notifications__list-item',
                    `notifications__list-item--${notification.type}`
                  )}
                >
                  <p className='notifications__list-item-title'>
                    {TodosEvents[notification.type]}
                  </p>
                  <p className='notifications__list-item-subtitle'>
                    {notification.message.label}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>

        <div
          className={clsx(
            'notifications__user-status',
            isWebSocketConnected && 'notifications__user-status--online'
          )}
        ></div>
      </div>
    </div>
  )
}
