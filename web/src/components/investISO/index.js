import React from 'react';
import {
    Form,
    InputNumber,
    Modal,
    Button,
    message,
    Tooltip,
    Typography,
    Input
  } from 'antd';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';
import {investISO, labelFile, takeLabeler} from '../../api/userAPI'
import {showNotificationTransaction, showNotificationLoading, showNotificationFail} from '../../utils/common'

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
            title="Labeling"
            okText="Submit"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="horizontal">
              <Form.Item label="Hash Labeled File">
                {getFieldDecorator('hashFile', {
                  rules: [{ required: true, message: 'Please input a string!'}],
                  initialValue: "",
                })(
                  <Input
                    // min={0}
                    style={{width: 150}}
                    // formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    // parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Tooltip title="Get content for label assignment" placement="leftTop">
                  <Button type="primary" htmlType="button" icon="vertical-align-bottom" onClick={() => {window.open(`https://ipfs.jumu.tk/${this.props.subHash}`,'_blank');}}>
                    <Text>Get hash</Text>
                  </Button>
                </Tooltip>
              </Form.Item>
            </Form>
          </Modal>
        );
      }
    },
);

class InvestISO extends React.Component {
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
    showNotificationLoading("Labeling file ...")
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if(err){
        return message.error('Please fill your IPFS hash');
      }
      let data = {
        idUnlabelFile: this.props.idFile,
        hashFile: values.hashFile
      }
      // console.log(data)
      labelFile(data)
        .then((txHash) => {
            showNotificationTransaction(txHash);
            form.resetFields();
            this.setState({ visible: false });
        })
        .catch((error) => {
            showNotificationFail("Error find labeler")
        })
    });
  };

  handleTakeLabeler = () => {
    showNotificationLoading("Taking labeler ...")
    let data = {
      idUnlabelFile: this.props.idFile
    }
    // console.log('datatatatatatasksjdkakwi')
    // console.log(data)
    takeLabeler(data)
    .then((txHash) => {
        showNotificationTransaction(txHash);
    })
    .catch((error) => {
        showNotificationFail("Error find labeler")
    })
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  
  render() {
    const {hasSlot, objLabeler, isMarket} = this.props
    console.log('skskskksksksksk1')
    console.log(objLabeler)
    return (
      <div>
        {
          objLabeler !== null ?
            objLabeler.isAccept ?
              <Tooltip title="You has labeled this dataset" placement="leftTop">
                <Button disabled={true} type="primary" ghost icon="bg-colors" onClick={this.showModal}>
                  <Text>Labeled</Text>
                </Button>
              </Tooltip>
              :
              <Tooltip title="Label this dataset" placement="leftTop">
                <Button type="primary" ghost icon="bg-colors" onClick={this.showModal}>
                  <Text>Label</Text>
                </Button>
              </Tooltip>
            :
            hasSlot ?
              <Tooltip title="sign this assignment" placement="leftTop">
                <Button type="primary" ghost icon="bg-colors" onClick={this.handleTakeLabeler}>
                  <Text>Take Labeler</Text>
                </Button>
              </Tooltip>
              :
              <div>
                <Tooltip title="Label this dataset" placement="leftTop">
                  <Button disabled={true} type="primary" ghost icon="bg-colors" onClick={this.showModal}>
                    <Text>Label</Text>
                  </Button>
                </Tooltip>
              </div>
          }
        
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            subHash={objLabeler !== null ?objLabeler.subHash:""}
          />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
})

const mapDispatchToProps = (dispatch) => ({
  
})
export default connect(mapStateToProps, mapDispatchToProps)(InvestISO);
