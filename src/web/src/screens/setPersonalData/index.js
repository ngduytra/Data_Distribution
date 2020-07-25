import React, { Component } from 'react'
import Layout from '../../components/layout'
import SettingContent from './SetPersonalData'

export default class SettingPData extends Component {
  render () {
    return (
        <Layout main={<SettingContent/>} history={this.props.history}/>
    )
  }
}