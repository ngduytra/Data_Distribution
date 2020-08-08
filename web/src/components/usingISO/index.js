import React from 'react';
import {
    Form,
    InputNumber,
    Modal,
    Button,
    message,
    Tooltip,
    Typography,
    Table,
    Divider
  } from 'antd';
import 'antd/dist/antd.css';
import {findLabeler, approveLabeledFile, removeLabeledFile, postToGetHash} from '../../api/userAPI'
import {showNotificationTransaction, showNotificationLoading, showNotificationFail} from '../../utils/common'
import config from '../../config'
import {getISOAddress} from '../../actions/page'
import {connect} from 'react-redux';
import * as moment from 'moment';

const { Text } = Typography;
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
      render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        
        return (
          <Modal
            visible={visible}
            title="Find Labeler"
            okText="Find"
            onCancel={onCancel}
            onOk={onCreate}
          >
                        <Form layout="horizontal">
              <Form.Item label="Total wage">
                {getFieldDecorator('wage', {
                  rules: [{ required: true, message: 'Please input fee of this assignment!'}],
                  initialValue: 5000
                })(
                  <InputNumber 
                    min={1}
                    max={50000}
                    step={1}
                    style={{width: 150}}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace('%', '').replace(/\$\s?|(,*)/g, '')}/>
                )}
              </Form.Item>
              <Form.Item label="Part Amount">
                {getFieldDecorator('partAmount', {
                  rules: [{ required: true, message: 'Please input the part that you want divide!'}],
                  initialValue: 5000
                })(
                  <InputNumber 
                    min={1}
                    max={1000}
                    step={1}
                    style={{width: 150}}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace('%', '').replace(/\$\s?|(,*)/g, '')}/>
                )}
              </Form.Item>
            </Form>
          </Modal>
        );
      }
    },
);

const CollectionApproveForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    state = {
      tempArray: [],
      hashtoView: []
    };
    componentDidMount = async() => {
      var temp = []
      var tempHashToView = []
      await this.props.fileArray.map(element=>{
        if(element.subHashLabeled!=""){
          temp.push(element)
        }
        this.setState({tempArray: temp})
      })

      await Promise.all( this.state.tempArray.map(element => {
        // console.log("aaaaaaaaaaaaaaaadddddddddddddddddddd")
        // console.log(element)
        var pageData = []
        return fetch(`https://ipfs.jumu.tk/${element.subHashLabeled}`)
        .then(response => response.json())
        .then(async(jsonData) => {
          // console.log(jsonData)
          let recordAmount = 1
          if(jsonData.length > 15 ){
            recordAmount = Math.floor(jsonData.length/15)
          }
          // console.log('ákskskaskjdkaskdksakaksk')
          // console.log(recordAmount)
          for (var i = 0; i < recordAmount; i++) {
            pageData.push(jsonData[Math.floor(Math.random()*jsonData.length)]);
          }
          let data= {
            object: pageData
          }
          return postToGetHash(data)
          .then(hash=>{
            // console.log('jsjsjsjskakakaaaaaaaaaaaaaaaaaaa')
            // console.log(hash)
            element.tempHash = hash
            tempHashToView.push(element)
            return hash
          })
        })
      })).then(ra => {
        // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        // console.log(tempHashToView)
      })
      .catch(e => {
         console.log(e)
      })
      // console.log("aadfasasdasasss")
      this.setState({hashtoView: tempHashToView})
      // console.log('sjsjsjsawijjwjiwi')
      // console.log(this.state.hashtoView)
    }

    handleApproveFile = (idFile, idPart) => {
      let data = {
        idUnlabelFile: idFile,
        idPart : idPart
      }
      // console.log('jkajskjsdkdksajksdjdkd')
      // console.log(data)
      approveLabeledFile(data).then((result) => {
        // console.log('jkajskjsdkdksajksdjdkd')
        // console.log(result)
        let arrTemp = this.state.tempArray;
        arrTemp.map(element=>{
          if(element.idPart == idPart){
            element.isAccept = true
          }
        })
        this.setState({
          tempArray: arrTemp
        })
    })
    };

    handleDeleteFile = (idFile, idPart) => {
      showNotificationLoading("Deleting ...")
      let data = {
        idUnlabelFile: idFile,
        idPart : idPart
      }
      // console.log('jkajskjsdkdksajksdjdkd')
      // console.log(data)
      removeLabeledFile(data).then((result) => {
        showNotificationTransaction(result);
        // console.log('jkajskjsdkdksajksdjdkd')
        // console.log(result)
        let arrTemp = this.state.tempArray;
        arrTemp.map(element=>{
          if(element.idPart == idPart){
            arrTemp.splice(arrTemp.indexOf(element), 1);
          }
        })
        this.setState({
          tempArray: arrTemp
        })
      }).catch((error) => {
        showNotificationFail("Deleting labeled file went wrong")
    })
    };
      render() {
        const { visible, onCancel, onCreate, form } = this.props;
        // console.log('akskkjaskjdkajsdkasj')
        // console.log(this.state.tempArray)
        const { getFieldDecorator } = form;
        const columnFile = [
          {
            title: 'Sub Hash Labeled',
            key: 'subHashLabeled',
            ellipsis: true,
            render: element => 
              element.isAccept ?
                <Button style={{textAlign: 'left', padding: 0, fontSize: 14}}  type="link" onClick={() => {window.open(`https://ipfs.jumu.tk/${element.subHashLabeled}`,'_blank');}}>{element.subHashLabeled}</Button>
              :
              <Button style={{textAlign: 'left', padding: 0, fontSize: 14}}  type="link" onClick={() => {window.open(`https://ipfs.jumu.tk/${element.tempHash}`,'_blank');}}>{element.tempHash}</Button> 
          },
          {
            title: 'Action',
            key: 'action',
            ellipsis: true,
            render: partLabel => (
              <span>
              <span>
                <Button disabled={partLabel.isAccept} style={{textAlign: 'left', padding: 0, fontSize: 14}}  onClick={() => this.handleApproveFile(this.props.idFile, partLabel.idPart)}>Approve</Button>
                <Divider type="vertical" />
                <Button disabled={partLabel.isAccept} style={{textAlign: 'left', padding: 0, fontSize: 14}}  onClick={() => this.handleDeleteFile(this.props.idFile, partLabel.idPart)}>Delete</Button>
              </span>
              </span>
            ),
          }
        ];
        return (
          <Modal
            visible={visible}
            title="Approve labeled file"
            okText="Finish"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Table columns={columnFile} dataSource={this.state.tempArray} />
          </Modal>
        );
      }
    },
);

class UsingISO extends React.Component {
  state = {
    visible: false
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };



  handleCreate = () => {
    showNotificationLoading("Posting a request to find labeler ...")
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if(err){
        return message.error('Please fill out a wage');
      }
      // console.log(values)
      let data = {
        idFile: this.props.idFile,
        partAmount: values.partAmount,
        wage: values.wage
      }
      // console.log(data)
      findLabeler(data)
        .then((txHash) => {
            showNotificationTransaction(txHash);
            form.resetFields();
        })
        .catch((error) => {
            showNotificationFail("Error find labeler")
        })
      })
  };

  handleApprove = () => {
        this.setState({ loading: false, visible: false });
  };

  

  // openUploadNotification = (values) => {
  //   showNotificationLoading("Uploading ...")
  //   let data = {
  //     ...values,
  //     idFile: this.props.idFile
  //   }
  //   console.log(data)
  //   usingISO(data)  
  //   .then((txHash) => {
  //     showNotificationTransaction(txHash);
  //     config.provider.waitForTransaction(txHash)
  //     .then(()=>{
  //       this.props.getISOAddress(this.props.userReducer.user.addressEthereum)
  //     })
  //   })
  //   .catch((error) => {
  //     showNotificationFail(error)
  //   })  
  // }

  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  
  render() {
    return (
      <div>
        {this.props.circle ? 
          <Tooltip title="Find labeler for this dataset" placement="top">
            <Button disabled={this.props.disabled} shape="circle" type="danger" ghost icon="usergroup-add" onClick={this.showModal}/>
          </Tooltip>
          :
          this.props.isCompleteLabel ?
            <Tooltip title="This data is labeled" placement="leftTop">
              <Button disabled={true} type="danger" ghost icon="usergroup-add" onClick={this.showModal}>
                <Text>Find Labler</Text>
              </Button>
            </Tooltip>
            :
            this.props.disabled ?
              <Tooltip title="Only owner" placement="leftTop">
                <Button disabled={true} type="danger" ghost icon="usergroup-add" onClick={this.showModal}>
                  <Text>Find Labler</Text>
                </Button>
              </Tooltip>
              :
              this.props.unLabelFile.length === 0 ?
              <div>
                  <Tooltip title="Find labeler this dataset" placement="leftTop">
                    <Button type="danger" ghost icon="usergroup-add" onClick={this.showModal}>
                      <Text>Find Labler</Text>
                    </Button>
                  </Tooltip>
                <CollectionCreateForm
                  wrappedComponentRef={this.saveFormRef}
                  visible={this.state.visible}
                  onCancel={this.handleCancel}
                  onCreate={this.handleCreate}
                />
                </div>
                : 
                <div>
                  <Tooltip title="Find labeler this dataset" placement="leftTop">
                    <Button type="danger" ghost icon="usergroup-add" onClick={this.showModal}>
                      <Text>Approve</Text>
                    </Button>
                  </Tooltip>
                  <CollectionApproveForm
                  wrappedComponentRef={this.saveFormRef}
                  visible={this.state.visible}
                  onCancel={this.handleCancel}
                  onCreate={this.handleApprove}
                  fileArray={this.props.unLabelFile[0].arrPartLabel}
                  idFile={this.props.idFile}
                />
                </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
})

const mapDispatchToProps = (dispatch) => ({
  getISOAddress: (address)=>dispatch(getISOAddress(address)),
})
export default connect(mapStateToProps, mapDispatchToProps)(UsingISO);