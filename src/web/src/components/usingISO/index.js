import React from 'react';
import {
    Form,
    InputNumber,
    Modal,
    Button,
    message,
    Tooltip,
    Typography
  } from 'antd';
import 'antd/dist/antd.css';
import {findLabeler} from '../../api/userAPI'
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
            <Form.Item label="Wage">
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
            </Form>
          </Modal>
        );
      }
    },
);

class UsingISO extends React.Component {
  state = {
    visible: false,
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
      console.log(values)
      let data = {
        idFile: this.props.idFile,
        wage: values.wage
      }
      console.log(data)
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
          <Tooltip title="Find labeler this dataset" placement="leftTop">
            <Button disabled={this.props.disabled} type="danger" ghost icon="usergroup-add" onClick={this.showModal}>
              <Text>Find Labler</Text>
            </Button>
          </Tooltip>
      }
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
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