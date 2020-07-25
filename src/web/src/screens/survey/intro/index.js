import React, { Component } from 'react'
import Layout from '../../../components/layout'
import Intro from './intro'

export default class UseContract extends Component {
  render () {
    return (
        <Layout main={<Intro/>} history={this.props.history}/>
    )
  }
}