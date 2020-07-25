import React from 'react';
import { Typography, Button, Tooltip, Modal } from 'antd';
import ReactQuill from 'react-quill';
import {postDescription} from '../../api/userAPI'
import 'react-quill/dist/quill.snow.css'; // ES6
const { Text} = Typography;


export default class InputDescription extends React.Component {
  state = { 
    visible: false,
    text: '',
   };

  handleChange = (value) => {
    this.setState({ text: value })
  }
  
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {

    const data = {
      idMongo: this.props.idMongo,
      description: this.state.text,
    }
    this.setState({
      visible: false,
      text: '',
    });
    console.log(data)
    postDescription(data).then((result) => {
      console.log(result)
    })
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
    <div>
      <Tooltip title="Edit description" placement="leftTop">
        <Button disabled={this.props.disabled} ghost type="danger" icon="edit" onClick={this.showModal}>
          <Text>Edit description</Text>
        </Button>
      </Tooltip>
      <Modal
        title="Edit Description"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okButtonProps={{ type: "danger" }}
        okText="Submit"
      >
        <ReactQuill
          theme="snow"
          value={this.state.text}
          onChange={this.handleChange} />
      </Modal>
    </div>
    )
  }
}