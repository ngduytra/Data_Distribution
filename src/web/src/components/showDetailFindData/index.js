import React from 'react';
import { Typography, Button, Tooltip, Modal,Avatar, Descriptions,Form, Input } from 'antd';
import ReactQuill from 'react-quill';
import {postDescription, huntFile, approveHuntedFile, cancelHuntedFile} from '../../api/userAPI'
import {connect} from 'react-redux';
import {showNotificationTransaction, showNotificationLoading, showNotificationFail} from '../../utils/common'
import 'react-quill/dist/quill.snow.css'; // ES6
const { Text} = Typography;


class ShowDetailFindData extends React.Component {
  state = { 
    visible: false,
    idFileMongo: "",
   };
  
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    showNotificationLoading("Hunting data ...")
    console.log(this.state.idFileMongo)
    let data = {
      idHuntFile: this.props.infor.idhuntFile,
      idFileHuntMongo: this.state.idFileMongo 
    }
    console.log(data)
    huntFile(data).then((result) => {
      showNotificationTransaction(result);
    }).catch((error) => {
      showNotificationFail("hunt data ERROR")
    })
  };

  handleApprove = () => {
    showNotificationLoading("Hunting data ...")
    let data = {
      idHuntFile: this.props.infor.idhuntFile,
    }
    console.log(data)
    approveHuntedFile(data).then((result) => {
      showNotificationTransaction(result);
    }).catch((error) => {
      showNotificationFail("approve hunt data ERROR")
    })
  };

  handleCancelHunt = () => {
    showNotificationLoading("Canceling hunt data ...")
    let data = {
      idHuntFile: this.props.infor.idhuntFile,
    }
    console.log(data)
    cancelHuntedFile(data).then((result) => {
      showNotificationTransaction(result);
    }).catch((error) => {
      showNotificationFail("Cancel hunt data ERROR")
    })
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const { infor } = this.props;
    return (
    <div>
      <Tooltip title="Monitize if you can" placement="leftTop">
          {
            !infor.isCanceled ?
              this.props.userReducer.user.addressEthereum === infor.peopleInNeed ?
                infor.isHunted ?
                  <Tooltip style={{display: 'flex'}} title={infor.hunter.nickName} placement="bottom" onClick={() => this.props.history.push(`/page/${infor.hunter.addressEthereum}`)} >
                    <Avatar shape='circle' style={{marginRight: 5}} size='small' src={window.$linkIPFS + infor.hunter.avatar } />   
                    <Button style={{textAlign: 'left', padding: 0, fontSize: 14, height: 20, width: '300', overflow: 'hiden'}} type="link" ><Text type="warning" style={{alignSelf: 'center'}} >{infor.hunter.nickName}</Text></Button>
                  </Tooltip>
                  : infor.hunter === null ?
                    <Button ghost type="danger" icon="edit" onClick={()=>this.handleCancelHunt()}>
                      <Text style={{color:'#910000'}}>Cancel</Text>
                    </Button>
                    : <Tooltip style={{display: 'flex'}} title={infor.hunter.nickName} placement="bottom" >
                        <Avatar shape='circle' style={{marginRight: 5}} size='small' src={window.$linkIPFS + infor.huntedFile.image } onClick={() => this.props.history.push(`/data/${infor.huntedFile._id}`)}/>
                        <Button ghost type="danger" icon="edit" onClick={() => this.handleApprove()}>
                          <Text>Approve Hunting</Text>
                        </Button>
                      </Tooltip>
              : infor.isHunted ?
                <Tooltip style={{display: 'flex'}} title={infor.hunter.nickName} placement="bottom" onClick={() => this.props.history.push(`/page/${infor.hunter.addressEthereum}`)} >
                  <Avatar shape='circle' style={{marginRight: 5}} size='small' src={window.$linkIPFS + infor.hunter.avatar } />   
                  <Button style={{textAlign: 'left', padding: 0, fontSize: 14, height: 20, width: '300', overflow: 'hiden'}} type="link" ><Text type="warning" style={{alignSelf: 'center'}} >{infor.hunter.nickName}</Text></Button>
                </Tooltip>
                : <Button ghost type="danger" icon="edit" onClick={this.showModal}>
                    <Text>Hunt Data</Text>
                  </Button>
            : <Button disabled={true} ghost type="danger" icon="edit" onClick={this.showModal}>
                <Text style={{color:'#910000'}}>Canceled</Text>
              </Button>
          }
      </Tooltip>
      <Modal
        title={<h1 style={{color:'#1890FF'}}>Hunt Data To Monitize</h1>}
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okButtonProps={{ type: "danger" }}
        okText="Hunting"
      >
        <Descriptions title="Information" column={1} bordered={true} layout='horizontal'>
          <Descriptions.Item label={<b style={{color:'#125358'}}>Renter</b>}>{infor.user.nickName}</Descriptions.Item>
          <Descriptions.Item label={<b style={{color:'#125358'}}>Description</b>}>{infor.IPFS.description}</Descriptions.Item>
          <Descriptions.Item label={<b style={{color:'#125358'}}>Hunted File</b>}>
          <Input placeholder="Your File Hash"
                onChange={e => {this.setState({idFileMongo : e.target.value })}}
           />
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
})

const mapDispatchToProps = (dispatch) => ({
  
})
export default connect(mapStateToProps, mapDispatchToProps)(ShowDetailFindData);