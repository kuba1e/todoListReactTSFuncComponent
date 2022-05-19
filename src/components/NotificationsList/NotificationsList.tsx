import React, { useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'

import './NotificationsList.scss'

import { notificationSelector, websocketSelector } from '../../store/selectors'

import NotificationListItem from '../../components/NotificationListItem'
import { filterHiddenNotifications } from '../../helpers'
import { useSelector } from 'react-redux'

export const NotificationsList = () => {
  const { notifications } = useSelector(notificationSelector)
  const { isWebSocketConnected } = useSelector(websocketSelector)

  const [isActiveList, setActiveList] = useState(false)

  useEffect(() => {
    document.addEventListener('click', handleHideList)
    return () => document.removeEventListener('click', handleHideList)
  }, [isActiveList])

  const handleShowList = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const currentTarget = event.target as HTMLDivElement
      if (
        filterHiddenNotifications(notifications).length &&
        currentTarget.classList.contains('notifications__inner')
      ) {
        setActiveList((isActiveList) => (isActiveList = !isActiveList))
      }
    },
    [notifications]
  )

  const handleHideList = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.notifications') && isActiveList) {
        setActiveList(false)
      }
    },
    [isActiveList]
  )

  const countWidget = filterHiddenNotifications(notifications).length ? (
    <span className={clsx('notifications__widget-count')}>
      {filterHiddenNotifications(notifications).length >= 99
        ? 99
        : filterHiddenNotifications(notifications).length}
    </span>
  ) : null

  return (
    <div
      className='notifications'
      onClick={handleShowList}
      data-testid='notifications'
    >
      <div className='notifications__inner'>
        <div className='notifications__widget'>{countWidget}</div>
        <div className='notifications__messages'>
          <ul
            className={clsx(
              'notifications__list',
              isActiveList && 'notifications__list--active'
            )}
          >
            {filterHiddenNotifications(notifications).map((notification) => {
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
