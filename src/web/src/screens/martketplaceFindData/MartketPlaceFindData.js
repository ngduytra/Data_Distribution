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

class MartketPlaceFindData extends React.Component {
  state = {
    findDataList: [],
    loading: true,
  };

  componentDidMount() {
    
    getFindDataList().then(async data => {
      let pageData = []
      await Promise.all( data.map(element => {
        return fetch(`https://ipfs.jumu.tk/${element.characteristicHash}`)
        .then(response => response.json())
        .then((jsonData) => {
          console.log(jsonData)
          element.IPFS = jsonData
          if (this.props.isPage && this.props.pageReducer.userInfoData.addressEthereum === element.user.addressEthereum){
            pageData.push(element)
          }
          return element
        })
      }))
      if(this.props.isPage){
        return pageData
      }
      return data
    })
    .then( (result)=>{
      this.setState({
        findDataList: result,
        loading: false
      })
    })
  }

  render() {
    return (
      <div style={{width: '100%'}}>
        {this.state.loading ? <ComponentLoading /> : 
          <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
            {this.state.findDataList.map(record =>
            <Col key={record.idFile} span={this.props.isPage ? 8 : 6}>
              <InfoISO
                record={record}
                action={true}
              />
            </Col>
          )}
          </Row>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pageReducer: state.pageReducer,
})

const mapDispatchToProps = (dispatch) => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(MartketPlaceFindData);