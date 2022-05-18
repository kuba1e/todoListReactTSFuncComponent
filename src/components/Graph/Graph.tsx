import { useTypedSelector } from '../../hooks/useTypedSelector'
import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import './Graph.scss'

import { userSelector } from '../../store/selectors'
import { fetchStatisticNotifications } from '../../store/actions/user'

import { useCanvas } from '../../hooks/useCanvas'

import Loader from '../../components/Loader'

export const Graph = () => {
  const dispatch = useDispatch()
  const { notificationsForStatistic, loading } = useTypedSelector(userSelector)

  useEffect(() => {
    dispatch(fetchStatisticNotifications())
  }, [])

  const canvasElement = useRef(null)

  useCanvas(canvasElement, notificationsForStatistic)

  const canvas =
    loading !== 'pending' ? (
      <div>
        <canvas ref={canvasElement} width='800px' height='600px'></canvas>
        <div className='widget'>
          <ul className='description-list'>
            <li className='description-list__item'>
              <div className='edit-icon'></div>Edit
            </li>
            <li className='description-list__item'>
              <div className='add-icon'></div>Add
            </li>
            <li className='description-list__item'>
              <div className='delete-icon'></div>Delete
            </li>
          </ul>
        </div>
      </div>
    ) : null

  const loader = loading === 'pending' ? <Loader /> : null

  return (
    <div className='graph'>
      {canvas}
      {loader}
    </div>
  )
}
