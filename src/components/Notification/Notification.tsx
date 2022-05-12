import React from 'react'
import clsx from 'clsx'

import './Notification.scss'

export const Notification = () => {
  return (
    <div className='notification'>
      <div className='notification-inner'>
        <div className='notification-widget'>
          <span className={clsx('notification-widget-count')}>2</span>
        </div>
        <div className='notification-messages'></div>
      </div>
    </div>
  )
}
