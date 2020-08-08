import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import config from '../../config';
import { Typography,Upload, message, Table } from 'antd';

const { Dragger } = Upload;
const { Text } = Typography;
const columns = [
  {
    title: 'File Name',
    className: 'name',
    dataIndex: 'name',
  },
  {
    title: 'Link',
    className: 'link',
    dataIndex: 'link',
    render: link => <a href={link}>{link}</a>,
  },
];
export default class UploadFile extends React.Component {
  state = {
    results: [],
  }
  onUpload(info){
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log({name: info.file.originFileObj.name, link: (config.ipfs_url + info.file.response.result)})
      let temp = this.state.results
      temp.push({name: info.file.originFileObj.name, link: (config.ipfs_url + info.file.response.result)})
      this.setState({results: temp})
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
  render() {
    console.log(this.state.results)
      return (
        <div>
          <Dragger name="file" multiple={true} action={config.api_url + "/users/upload"} onChange={e => {this.onUpload(e)}}>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from uploading company data or other
              band files
            </p>
          </Dragger> 
          <Table
            columns={columns}
            dataSource={this.state.results}
            bordered
          />,
          {/* {
            
          }
          <Text>{
            this.state.results.map(element=>{
              <Text>sjsjsjsj</Text>
            })
          }</Text> */}
        </div>
      )
  }
}
