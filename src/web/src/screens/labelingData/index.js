import React, { Component } from 'react'
import Layout from '../../components/layout'
import MartketPlaceLabelData from './MartketPlaceLabelData'

export default class MartketPlaceFindDataMain extends Component {
  render () {
    return (
        <Layout main={<MartketPlaceLabelData isPage={false}/>} history={this.props.history}/>
    )
  }
}