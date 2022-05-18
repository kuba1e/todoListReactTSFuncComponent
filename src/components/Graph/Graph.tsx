import { useTypedSelector } from '../../hooks/useTypedSelector'
import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import './Graph.scss'

import {
  getArrayForGraphRendering,
  getTheBiggestCountNumber
} from '../../helpers'
import { userSelector } from '../../store/selectors'
import { fetchStatisticNotifications } from '../../store/actions/user'

import './Graph.scss'
import { IStatistic } from '../../types/generalTypes'

export const Graph = () => {
  const dispatch = useDispatch()
  const { notificationsForStatistic } = useTypedSelector(userSelector)

  const arrayForGraphRendering: IStatistic[] = getArrayForGraphRendering(
    notificationsForStatistic
  )

  const statistic = [
    { edit: 5, delete: 6, add: 7, date: '5.5' },
    { edit: 5, delete: 6, add: 7, date: '8.5' },
    { edit: 5, delete: 6, add: 20, date: '17.5' },
    { edit: 5, delete: 6, add: 30, date: '18.5' }
  ]

  const canvasElement = useRef(null)

  const MILLISECONDS_IN_TWO_WEEK = 1000 * 60 * 60 * 24 * 14
  const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24
  const maxScaleX = 15
  const maxScaleY = getTheBiggestCountNumber(statistic)

  useEffect(() => {
    dispatch(fetchStatisticNotifications())
  }, [])

  useEffect(() => {
    const dateNow = Date.now()
    const dateMonthAgo = new Date(dateNow - MILLISECONDS_IN_TWO_WEEK)
    const successColor = 'green'
    const warningColor = 'yellow'
    const dangerColor = 'red'

    const arrayOfDays = []

    for (
      let i = MILLISECONDS_IN_A_DAY;
      MILLISECONDS_IN_TWO_WEEK >= i;
      i += MILLISECONDS_IN_A_DAY
    ) {
      const date = new Date(dateMonthAgo.getTime() + i)
      const pointOfDate = `${date.getDate()}.${date.getMonth() + 1}`
      arrayOfDays.push(pointOfDate)
    }

    if (canvasElement.current !== null) {
      const canvas = canvasElement.current as HTMLCanvasElement
      const ctx = canvas.getContext('2d')

      const canvasPlotWidth = canvas.clientWidth - 50
      const canvasPlotHeight = canvas.clientHeight - 50
      ctx.font = '14px Arial'
      ctx.strokeStyle = '#fff'

      const scaleX = canvasPlotWidth / maxScaleX
      const scaleY = canvasPlotHeight / (maxScaleY + 1)
      const scaleDay = scaleX / 3

      const shiftScaleX = scaleX / 4

      for (let i = 1; i <= maxScaleX; i++) {
        console.log(scaleX)
        ctx?.moveTo(i * scaleX, 0)
        ctx?.lineTo(i * scaleX, canvasPlotHeight - scaleY)

        if (arrayOfDays[i - 1] !== undefined) {
          ctx?.fillText(
            arrayOfDays[i - 1],
            i * scaleX + shiftScaleX,
            canvasPlotHeight + 10
          )
        }
      }

      for (let i = 1; i <= maxScaleY; i++) {
        //  if (i * scaleY > scaleX) {
        ctx?.moveTo(scaleX, i * scaleY)
        ctx?.lineTo(canvasPlotWidth, i * scaleY)
        ctx?.fillText(`${maxScaleY - (i - 1)}`, 20, i * scaleY)
        ctx?.stroke()
        //  }
      }

      ctx.lineWidth = 1
      ctx?.stroke()
      ctx?.closePath()

      ctx?.beginPath()
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 2
      ctx?.moveTo(scaleX, canvasPlotHeight - scaleY)
      ctx?.lineTo(canvasPlotWidth, canvasPlotHeight - scaleY)
      ctx?.moveTo(scaleX, 0)
      ctx?.lineTo(scaleX, canvasPlotHeight - scaleY)
      ctx?.stroke()
      ctx?.closePath()

      arrayOfDays.forEach((day, index, array) => {
        const dayData =
          statistic[
            statistic.findIndex((statisticDay) => {
              return statisticDay.date === day
            })
          ]

        ctx?.beginPath()
        if (dayData) {
          ctx.fillStyle = warningColor
          ctx?.fillRect(
            scaleX * (index + 1),
            canvasPlotHeight - dayData.edit * scaleY - scaleY,
            scaleDay,
            dayData.edit * scaleY
          )
          ctx.fillStyle = successColor
          ctx?.fillRect(
            scaleX * (index + 1) + scaleDay,
            canvasPlotHeight - dayData.add * scaleY - scaleY,
            scaleDay,
            dayData.add * scaleY
          )

          ctx.fillStyle = dangerColor
          ctx?.fillRect(
            scaleX * (index + 1) + 2 * scaleDay,
            canvasPlotHeight - dayData.delete * scaleY - scaleY,
            scaleDay,
            dayData.delete * scaleY
          )
        }
      })

      //    const dayData = statistic[0]
    }
  }, [notificationsForStatistic])
  return (
    <div>
      <canvas
        ref={canvasElement}
        className='graph'
        width='800px'
        height='600px'
      ></canvas>
    </div>
  )
}
