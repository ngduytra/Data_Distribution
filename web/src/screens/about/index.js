
import React, { Component } from 'react'
import Layout from '../../components/layout'
import About from './about'

export default class SettingPData extends Component {
  render () {
    return (
        <Layout main={<About/>} history={this.props.history}/>
    )
  }
}
