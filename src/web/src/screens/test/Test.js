import React from 'react';
import 'antd/dist/antd.css';
import {
  Row,
  Col,
 } from 'antd';
import {getFindDataList} from '../../api/userAPI'
import InfoISO from '../../components/infoISO'
import { connect} from 'react-redux'
import ComponentLoading from '../../components/loading'

class Test extends React.Component {
  state = {
    findDataList: [],
    loading: true,
  };

  componentDidMount() {
    fetch('https://ipfs.jumu.tk/QmNXFgojtPQuzxKYoBrb2fmnYYQZ1TvaJkevLSm9HBrWmC')
      .then(response => {
        console.log('hêkkejfiaoskodksaodkoaskdoskao')
        console.log(response)
        return response.json()})
        .then((jsonData) => {
          console.log('trafffffffffffffffffffffff')
          console.log(jsonData)
        })
  }

  render() {
    return (
      <div style={{width: '100%'}}>
        <h1>Hello</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pageReducer: state.pageReducer,
})

const mapDispatchToProps = (dispatch) => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(Test);