import { useTypedSelector } from '../../hooks/useTypedSelector'
import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import './Graph.scss'

import {
  getArrayForGraphRendering,
  getTheBiggestCountNumber,
  getDivider
} from '../../helpers'
import { userSelector } from '../../store/selectors'
import { fetchStatisticNotifications } from '../../store/actions/user'
import { IStatistic } from '../../types/generalTypes'

import Loader from '../../components/Loader'

export const Graph = () => {
  const dispatch = useDispatch()
  const { notificationsForStatistic, loading } = useTypedSelector(userSelector)

  const arrayForGraphRendering: IStatistic[] = getArrayForGraphRendering(
    notificationsForStatistic
  )

  const canvasElement = useRef(null)

  console.log(arrayForGraphRendering)

  const MILLISECONDS_IN_TWO_WEEK = 1000 * 60 * 60 * 24 * 14
  const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24
  const maxScaleX = 15
  const maxScaleY = getTheBiggestCountNumber(arrayForGraphRendering)
  const divider = getDivider(maxScaleY)

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
      if (ctx !== null) {
        const canvasPlotWidth = canvas.clientWidth - 50
        const canvasPlotHeight = canvas.clientHeight - 50
        ctx.font = '14px Arial'
        ctx.strokeStyle = '#fff'

        const scaleX = canvasPlotWidth / maxScaleX
        const scaleY = canvasPlotHeight / maxScaleY
        const scaleDay = scaleX / 3
        const shiftScaleX = scaleX / 4

        for (let i = 1; i <= maxScaleX; i++) {
          ctx?.moveTo(i * scaleX, 0)
          ctx?.lineTo(i * scaleX, canvasPlotHeight)

          if (arrayOfDays[i - 1] !== undefined) {
            ctx?.fillText(
              arrayOfDays[i - 1],
              i * scaleX + shiftScaleX,
              canvasPlotHeight + 20
            )
          }
        }

        for (let i = 0; i <= maxScaleY; i++) {
          if (!(i % divider) && i !== maxScaleY) {
            ctx?.moveTo(scaleX, i * scaleY)
            ctx?.lineTo(canvasPlotWidth, i * scaleY)
            ctx?.fillText(`${maxScaleY - i}`, 20, i * scaleY + 15)
            ctx?.stroke()
          }
        }

        ctx.lineWidth = 1
        ctx?.stroke()
        ctx?.closePath()

        ctx?.beginPath()
        ctx.strokeStyle = '#000'
        ctx.lineWidth = 2
        ctx?.moveTo(scaleX, canvasPlotHeight)
        ctx?.lineTo(canvasPlotWidth, canvasPlotHeight)
        ctx?.moveTo(scaleX, 0)
        ctx?.lineTo(scaleX, canvasPlotHeight)
        ctx?.stroke()
        ctx?.closePath()

        arrayOfDays.forEach((day, index) => {
          const dayData =
            arrayForGraphRendering[
              arrayForGraphRendering.findIndex((statisticDay) => {
                return statisticDay.date === day
              })
            ]

          ctx?.beginPath()
          if (dayData) {
            ctx.fillStyle = warningColor
            ctx?.fillRect(
              scaleX * (index + 1),
              canvasPlotHeight - dayData.edit * scaleY,
              scaleDay,
              dayData.edit * scaleY
            )
            ctx.fillStyle = successColor
            ctx?.fillRect(
              scaleX * (index + 1) + scaleDay,
              canvasPlotHeight - dayData.add * scaleY,
              scaleDay,
              dayData.add * scaleY
            )

            ctx.fillStyle = dangerColor
            ctx?.fillRect(
              scaleX * (index + 1) + 2 * scaleDay,
              canvasPlotHeight - dayData.delete * scaleY,
              scaleDay,
              dayData.delete * scaleY
            )
          }
        })
      }
    }
  }, [notificationsForStatistic])

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
