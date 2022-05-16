import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'

import './NotificationsList.scss'

import { useTypedSelector } from '../../hooks/useTypedSelector'
import { userSelector } from '../../store/selectors'

import NotificationListItem from '../../components/NotificationListItem'

export const NotificationsList = () => {
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
      {notifications.length >= 99 ? 99 : notifications.length}
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
                <NotificationListItem
                  key={notification.id}
                  notification={notification}
                />
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
