import React, { Component, ReactNode } from 'react'

import './ErrorBoundary.scss'

import ErrorIndicator from '../ErrorIndicator'

interface State {
  error: string
}

interface Props {
  children: ReactNode
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: ''
  }

  public componentDidCatch(error: Error) {
    this.setState({ error: error.message })
  }

  public render() {
    const { error } = this.state
    const { children } = this.props

    const content = error ? <ErrorIndicator errorMessage={error} /> : children

    return content
  }
}
