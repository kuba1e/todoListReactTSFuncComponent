import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

import './Graph.scss'

import { getArrayForGraphRendering } from '../../helpers'
import { notificationSelector } from '../../store/selectors'
import { fetchStatisticNotifications } from '../../store/actions/user'
import { IStatistic } from '../../types/generalTypes'
import Loader from '../../components/Loader'

export const Graph = () => {
  const dispatch = useDispatch()
  const { notificationsForStatistic, loading } =
    useSelector(notificationSelector)

  useEffect(() => {
    dispatch(fetchStatisticNotifications())
  }, [])

  const arrayForGraphRendering: IStatistic[] = getArrayForGraphRendering(
    notificationsForStatistic
  )

  const char =
    loading !== 'pending' ? (
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart width={800} height={600} data={arrayForGraphRendering}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='add' fill='green' />
          <Bar dataKey='edit' fill='yellow' />
          <Bar dataKey='delete' fill='red' />
        </BarChart>
      </ResponsiveContainer>
    ) : null

  const loader = loading === 'pending' ? <Loader /> : null

  return (
    <div className='graph' data-testid='graph'>
      {char}
      {loader}
    </div>
  )
}
