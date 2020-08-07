import React from 'react';
import 'antd/dist/antd.css';
import {
  Row,
  Col,
 } from 'antd';
import {getUnlabelDataList} from '../../api/userAPI'
import InfoLabelFile from '../../components/infoLabelFile'
import { connect} from 'react-redux'
import ComponentLoading from '../../components/loading'

class MartketPlaceLabelData extends React.Component {
  state = {
    findDataList: [],
    loading: true,
  };

  componentDidMount() {
    
    getUnlabelDataList().then(async data => {
      console.log("sadasfsđSddddddddddddddddddddddddddddddddddd")
      console.log(data)
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
              <InfoLabelFile
                record={record}
                action={false}
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
export default connect(mapStateToProps, mapDispatchToProps)(MartketPlaceLabelData);