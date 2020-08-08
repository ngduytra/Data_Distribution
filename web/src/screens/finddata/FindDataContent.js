import React, { Component } from 'react'
import { Layout,Form,
    Select,
    InputNumber,
    Switch,
    Modal,
    Upload,
    Icon,
    Input,
    Button,
    message, Col,Slider } from 'antd';  
import WrappedDynamicFieldSet from '../survey/content/Content';
import {postHuntFile} from '../../api/userAPI'
import {showNotificationTransaction, showNotificationLoading, showNotificationFail} from '../../utils/common'
const { Sider, Content } = Layout;
const { TextArea } = Input;

export class FindDataContent extends Component {
    state={
        inputValue1: 1
    }
    onChange = value => {
        this.setState({
          inputValue1: value
        });
      };
    handleSubmit = e => {
        showNotificationLoading("Posting a request to find data ...")
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            postHuntFile(values)
            .then((txHash) => {
                showNotificationTransaction(txHash);
            })
            .catch((error) => {
                showNotificationFail("Loi find data")
            })
          }
        });
      };
    render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { inputValue1 } = this.state;
        const { getFieldDecorator } = form;
        const { Option } = Select;
        return (
            <div>
                <Layout>
                    <Content>
                        <Form onSubmit={this.handleSubmit}  layout="vertical">
                            <Form.Item label={<h3>NAME</h3>}>
                                {getFieldDecorator('name', {
                                    rules: [
                                    { message: 'Please select dataset\'s field ' },
                                    ],
                                })(
                                    <Input placeholder='Please enter a genaral name'/>
                                )}
                            </Form.Item>
                            <Form.Item label={<h3>DATASET'S FIELDS</h3>}>
                            {getFieldDecorator('field', {
                                rules: [
                                { message: 'Please select dataset\'s field ', type: 'array' },
                                ],
                            })(
                                <Select mode="multiple" style={{width:"60%"}} placeholder="Please select dataset's Field">
                                <Option value="personaldata">Personal Data</Option>
                                <Option value="sport">Sport</Option>
                                <Option value="medical">Medical</Option>
                                <Option value="realestate">Real-Estate</Option>
                                <Option value="Hospitality">Hospitality</Option>
                                <Option value="Economy">Economy</Option>
                                <Option value="Weather">Weather</Option>
                                </Select>,
                            )}
                            </Form.Item>
                            <Form.Item label={<h3>HOW MANY ROWS?</h3>}>
                                <Col span={12}>
                                    {getFieldDecorator('rowAmount')(
                                        <Slider
                                        min={0}
                                        max={25000}
                                        marks={{
                                            0: 'A',
                                            5000: 'B',
                                            10000: 'C',
                                            15000: 'D',
                                            20000: 'E',
                                            25000: 'F',
                                        }}
                                        onChange={this.onChange}
                                        value={typeof inputValue1 === 'number' ? inputValue1 : 0}
                                        />,
                                    )}
                                </Col>    
                                <Col span={4}>
                                    <InputNumber
                                        min={1}
                                        max={25000}
                                        style={{ marginLeft: 16}}
                                        value={inputValue1}
                                        onChange={this.onChange}
                                    />,
                                </Col> 
                            </Form.Item>
                            <Form.Item label={<h3>DESCRIPTION</h3>}>
                            {getFieldDecorator('description', {
                                rules: [{ message: 'Please enter some description about your demand!' }],
                            })(<TextArea placeholder="Please enter some descriptions" />)}
                            </Form.Item>
                            <Form.Item label={<h3>REWARDS</h3>}>
                            {getFieldDecorator('reward')
                            (<InputNumber defaultValue="1"/>)}
                            </Form.Item>
                            <Form.Item label=" " colon={false}>
                                <Button type="primary" htmlType="submit">
                                Submit
                                </Button>
                            </Form.Item>
                            {/* <Form.Item label="Dataset's name">
                                {getFieldDecorator('DatasetName', {
                                    rules: [{ required: true, message: 'Please enter the name of this dataset!' }],
                                })(<Input placeholder="Please enter dataset's name" />)}
                            </Form.Item>
                            <Form.Item label="Provider's name">
                            {getFieldDecorator('ProvidersName', {
                                rules: [{ required: true, message: "Please input Proveider's name!" }],
                            })(<Input placeholder="Please enter provider's name" />)}
                            </Form.Item>
                            <Form.Item label="Description">
                            {getFieldDecorator('Discription', {
                                rules: [{ required: true, message: 'Please enter some infomations about this dataset!' }],
                            })(<TextArea placeholder="Please enter some descriptions" />)}
                            </Form.Item>
                            <Form.Item label="Kind">
                            {getFieldDecorator('Kind', {
                                rules: [{ required: true, message: 'Please enter type of this dataset!' }],
                            })(<TextArea placeholder="Please enter type of this dataset" />)}
                            </Form.Item>
                            <Form.Item label="Tags">
                            {getFieldDecorator('Tags', {
                                rules: [
                                { message: 'Please select dataset\'s tag ', type: 'array' },
                                ],
                            })(
                                <Select mode="multiple" placeholder="Please select dataset's tag">
                                <Option value="personaldata">Personal Data</Option>
                                <Option value="sport">Sport</Option>
                                <Option value="medical">Medical</Option>
                                <Option value="realestate">Real-Estate</Option>
                                <Option value="Hospitality">Hospitality</Option>
                                <Option value="Economy">Economy</Option>
                                <Option value="Weather">Weather</Option>
                                </Select>,
                            )}
                            </Form.Item>

                            <Form.Item label="Price DIV">
                            {getFieldDecorator('Price', {rules: [{ required: true, message: 'Please input cost of this song!'}], initialValue: 0, onChange: (e) => {
                                // e = Math.ceil(e)
                                this.setState({USD: e/this.state.costUSD})
                                }})(<InputNumber min={0} max={10000000000} />)}
                            <span className="ant-form-text"> DIV</span>
                            <span className="ant-form-text">➜   {this.state.USD} USD</span>
                            </Form.Item> */}

                            {/* <Form.Item label="Price USD">
                            <span className="ant-form-text">{this.state.USD} USD</span>
                            </Form.Item>

                            <Form.Item label="Contract permission">
                            {getFieldDecorator('ContractPermission', { initialValue: true, valuePropName: 'checked' })(<Switch />)}
                            </Form.Item>

                            <Form.Item label="Upload Image">
                            {getFieldDecorator('Image', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFileImage,
                            })(
                                <Upload
                                name="file"
                                action={config.api_url + "/users/upload"}
                                listType="picture"
                                >
                                <Button>
                                    <Icon type="upload" /> Click to upload image
                                </Button>
                                </Upload>,
                            )}
                            </Form.Item>

                            <Form.Item label="Upload Dataset">
                            {getFieldDecorator('Music', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFileMusic,
                                rules: [{ required: true}],
                            })(
                                <Upload.Dragger action={config.api_url + "/users/upload"}>
                                <p className="ant-upload-drag-icon" >
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload dataset</p>
                                </Upload.Dragger>,
                            )}
                            </Form.Item> */}
                        </Form>
                    </Content>
                    <Sider style={{backgroundColor:"#62D9FB"}}>
                        <h1>History</h1>
                    </Sider>
                </Layout>
            </div>
        )
    }
}

const WrappedLogin = Form.create()(FindDataContent)

export default WrappedLogin
