import React, { Component } from 'react'
import Layout from '../../components/layout'
import MartketPlaceFindData from './MartketPlaceFindData'

export default class MartketPlaceFindDataMain extends Component {
  render () {
    return (
        <Layout main={<MartketPlaceFindData isPage={false}/>} history={this.props.history}/>
    )
  }
}