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
      <canvas ref={canvasElement} width='800px' height='600px'></canvas>
    ) : null

  const loader = loading === 'pending' ? <Loader /> : null

  return (
    <div className='graph'>
      {canvas}
      {loader}
    </div>
  )
}
