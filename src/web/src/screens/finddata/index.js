import React, { Component } from 'react'
import Layout from '../../components/layout'
import FindDataContent from './FindDataContent'

export default class Contract extends Component {
  render () {
    return (
        <Layout main={<FindDataContent/>} history={this.props.history}/>
    )
  }
}