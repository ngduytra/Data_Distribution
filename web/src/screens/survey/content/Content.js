import React, { Component } from 'react'
import { Form,Radio, Row, Col,Button,Upload, InputNumber,Modal,Slider,Select, Input, Divider, Icon} from 'antd';
import './content.css'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Pay from '../pay';


const { Option } = Select;
const style = { background: '#8AA4D5', padding: '8px 0' };
let id = 0;
function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}
function handleChange(value) {
    console.log(`selected ${value}`);
  }


class Content extends React.Component {
    onFinish = values => {
        console.log(values);
    };

    onFinish1 = values => {
    console.log('Received values of form:', values);
    };
    remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
        return;
    }

    // can use data-binding to set
    form.setFieldsValue({
        keys: keys.filter(key => key !== k),
    });
    };

    add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
        keys: nextKeys,
    });
    };

    handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        if (!err) {
        const { keys, names } = values;
        console.log('Received values of form: ', values);
        console.log('Merged values:', keys.map(key => names[key]));
        }
    });
    };
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          }
        ],
        inputValue1: 1,
        inputValue2: 1,
        inputValue3:[20,50],
        inputValue4: 1
    };
    
    handleCancel = () => this.setState({ previewVisible: false });
    
    handlePreview = async file => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
    
        this.setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
        });
      };
    
      handleChange = ({ fileList }) => this.setState({ fileList });

      onChange = value => {
        this.setState({
          inputValue1: value,
          inputValue4: value* this.state.inputValue2
        });
        };
      onChange1 = value => {
        this.setState({
          inputValue2: value,
          inputValue4: value *this.state.inputValue1
        });
      };
      onChange2 = value => {
        this.setState({
          inputValue3: value
        });
      };

    render() {
        const { inputValue1, inputValue2, inputValue3, inputValue4 } = this.state;
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
        </div>
        );
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
            },
            wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 4 },
            },
        };
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <Form.Item
            {...(formItemLayout)}
            label={`Question ${index}`}
            required={false}
            key={k}
            >
            {getFieldDecorator(`names[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                {
                    required: true,
                    whitespace: true,
                    message: "Please input the question or delete this field.",
                },
                ],
            })(
                <Input.Group compact>
                    <Input placeholder="Question" style={{ width: '60%', marginRight: 8 }} />
                    <div className="clearfix">
                        <Upload
                        style={{width:"40", height:"50"}}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        >
                        {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </div>
                    <div>
                        <Input placeholder="Option 1" style={{ width: '60%', marginRight: 8 }}/>
                        <Input placeholder="Option 2" style={{ width: '60%', marginRight: 8 }}/>
                        <Input placeholder="Option 3" style={{ width: '60%', marginRight: 8 }}/>
                        <Input placeholder="Option 4" style={{ width: '60%', marginRight: 8 }}/>
                    </div>
                </Input.Group>)}
            {keys.length > 1 ? (
                <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.remove(k)}
                />
            ) : null}
            </Form.Item>
        ));
        return (
            <div>
                <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
                   <h1>Public Title</h1>
                </Divider>
                <Row gutter={16}>
                    <Col className="gutter-row" span={"100%"}>
                    <div style={style}>
                        <Form name="complex-form" onFinish={this.onFinish} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
                            <Form.Item
                            name="title"
                            label= "Title"
                            noStyle
                            rules={[{ required: true, message: 'Title is required' }]}
                            >
                                <Input style={{ width: "60%" }} placeholder="Please enter title" />
                            </Form.Item>
                            <Form.Item
                            name="title"
                            label= "Description"
                            noStyle
                            rules={[{ required: true, message: 'Title is required' }]}
                            >
                                <Input style={{ width: "60%" }} placeholder="Please enter description" />
                            </Form.Item>
                        </Form>
                    </div>
                    </Col>
                </Row>
                <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
                    <h1>Question</h1>
                </Divider>
                <Row gutter={16}>
                    <Col className="gutter-row" span={"100%"}>
                        <div style={style}>
                        <Form onSubmit={this.handleSubmit}>
                            {formItems}
                            <Form.Item {...formItemLayoutWithOutLabel}>
                            <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                                <Icon type="plus" /> Add question
                            </Button>
                            </Form.Item>
                            <Form.Item {...formItemLayoutWithOutLabel}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            </Form.Item>
                        </Form>
                        </div>
                    </Col>
                </Row>
                <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
                    <h1>Who will see your Survey?</h1>
                </Divider>
                <Row gutter={[16, 24]}>
                    <Col className="gutter-row" span={"100%"}>
                    <div style={style}>
                        <Form name="complex-form" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
                            <Form.Item label="Total Responses" noStyle>
                                <Row>
                                    <Col span={12}>
                                        {getFieldDecorator('slider1')(
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
                                </Row>
                            </Form.Item>
                            <Form.Item label="Reward per Response" noStyle>
                                <Row>
                                    <Col span={12}>
                                        {getFieldDecorator('slider2')(
                                            <Slider
                                            min={0}
                                            max={125}
                                            marks={{
                                                0: 'A',
                                                25: 'B',
                                                50: 'C',
                                                75: 'D',
                                                100: 'E',
                                                125: 'F',
                                            }}
                                            onChange={this.onChange1}
                                            value={typeof inputValue2 === 'number' ? inputValue2 : 0}
                                            />,
                                        )}
                                    </Col>    
                                    <Col span={4}>
                                        <InputNumber
                                            min={1}
                                            max={125}
                                            style={{ marginLeft: 16}}
                                            value={inputValue2}
                                            onChange={this.onChange1}
                                        />,
                                    </Col>    
                                </Row>
                            </Form.Item>
                            <Form.Item label="Ages" noStyle>
                                <Row>
                                    <Col span={12}>
                                        {getFieldDecorator('slider3')(
                                            <Slider
                                            range
                                            min={0}
                                            max={100}
                                            marks={{
                                                0: 'A',
                                                25: 'B',
                                                50: 'C',
                                                75: 'D',
                                                100: 'E',
                                            }}
                                            onChange={this.onChange2}   
                                            value= {inputValue3}
                                            />,
                                        )}
                                    </Col>    
                                    <Col span={4}>
                                        <Input
                                            style={{ marginLeft: 16}}
                                            value={`${inputValue3[0]} - ${inputValue3[1]}`}
                                        />
                                    </Col>    
                                </Row>
                            </Form.Item>
                            <Form.Item label="Gender" noStyle>
                                {getFieldDecorator('radio-button')(
                                    <Radio.Group>
                                    <Radio.Button value="both">Both</Radio.Button>
                                    <Radio.Button value="male">Male</Radio.Button>
                                    <Radio.Button value="female">Felmale</Radio.Button>
                                    </Radio.Group>,
                                )}
                            </Form.Item>
                            <Form.Item label="Locations" noStyle>
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder="select one country"
                                    defaultValue={['vietnam']}
                                    onChange={handleChange}
                                    optionLabelProp="label"
                                >
                                    <Option value="china" label="China">
                                    <span role="img" aria-label="China">
                                        🇨🇳
                                    </span>
                                    China
                                    </Option>
                                    <Option value="usa" label="USA">
                                    <span role="img" aria-label="USA">
                                        🇺🇸
                                    </span>
                                    USA 
                                    </Option>
                                    <Option value="japan" label="Japan">
                                    <span role="img" aria-label="Japan">
                                        🇯🇵
                                    </span>
                                    Japan
                                    </Option>
                                    <Option value="korea" label="Korea">
                                    <span role="img" aria-label="Korea">
                                        🇰🇷
                                    </span>
                                    Korea 
                                    </Option>
                                    <Option value="vietnam" label="VietNam">
                                    <span role="img" aria-label="VietNam">
                                        VN
                                    </span>
                                    Viet Nam
                                    </Option>
                                    <Option value="unitedkingdom" label="United Kingdom">
                                    <span role="img" aria-label="United Kingdom">
                                        UK
                                    </span>
                                    United Kingdom
                                    </Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </div>
                    </Col>
                </Row>
                <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
                   <h1>Total</h1>
                </Divider>
                <Row gutter={16}>
                    <Col className="gutter-row" span={"100%"}>
                    <div style={style}>
                        <InputNumber
                            style={{ marginLeft: 16, width:"50%"}}
                            value = {inputValue4}
                        />
                        <span style={{width:"50%", fontSize:20}}><b>DIVS</b></span>
                    </div>
                    </Col>
                </Row>
                <Pay total={inputValue4}/>
            </div>
        )
    }
}
const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(Content);

export default WrappedDynamicFieldSet
