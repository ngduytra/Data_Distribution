import React, { Component } from 'react'
import Layout from '../../../components/layout'
import SurveyContent from './surveyContent'

export default class ISO extends Component {
  render () {
    return (
        <Layout main={<SurveyContent/>} history={this.props.history}/>
    )
  }
}