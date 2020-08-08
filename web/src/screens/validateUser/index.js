import React, { Component } from 'react'
import Layout from '../../components/layout'
import userTable from './userTable'

export default class validateUser extends Component {
  render () {
    return (
        <Layout main={<userTable/>} history={this.props.history} />
    )
  }
}