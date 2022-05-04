import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './ErrorBoundary.scss'

import ErrorIndicator from '../ErrorIndicator'

export default class ErrorBoundary extends Component {
  constructor() {
    super()
    this.state = {
      error: ''
    }
  }

  componentDidCatch(error) {
    this.setState({ error: error.message })
  }

  render() {
    const { error } = this.state
    const { children } = this.props

    const content = error ? <ErrorIndicator errorMessage={error} /> : children

    return content
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node
}
