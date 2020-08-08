import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Input,Switch,Row, Col,Checkbox, Select,AutoComplete, Tooltip,DatePicker, Button } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const { Option } = Select;

const SettingPrivacy = () => {
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };
  const dataSource = ['Viet Nam', 'United State of America', 'United Kingdom'];
  const dataSource1 = ['Ha noi', 'Washington', 'London'];
  const dataSource2 = ['Freelancer', 'Direction', 'Manager','Employee'];
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{width: 70}}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form name="complex-form" onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
      <Form.Item label="Fullname">
        <Form.Item
          name="fullname"
          noStyle
          rules={[{ required: true, message: 'Username is required' }]}
        >
          <Input style={{ width: 300 }} placeholder="NGUYEN DUY TRA" />
          <Tooltip title="Useful information">
          <a href="/about" style={{ margin: '0 8px' }}>
            Need Help?
          </a>
        </Tooltip>
        </Form.Item>
      </Form.Item>
      <Form.Item label="Identity Number">
        <Input style={{width:"50%"}} placeholder="108800119"/>
      </Form.Item>
      <Form.Item label="DoB">
          <DatePicker />
      </Form.Item>
      <Form.Item label="Address">
        <Input.Group compact>
          <Form.Item
            name="country"
            hasFeedback
            rules={[{ required: true, message: 'Please select your country!' }]}
          >
            <AutoComplete
                    style={{ width: 200 }}
                    dataSource={dataSource}
                    placeholder="Country"
                    filterOption={(inputValue, option) =>
                        option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
            >
              <Input/>
            </AutoComplete>
          </Form.Item>
          <Form.Item
            name={['address', 'province']}
            noStyle
            rules={[{ required: true, message: 'Province is required' }]}
          >
            <AutoComplete
                    style={{ width: 200 }}
                    dataSource={dataSource1}
                    placeholder="Province"
                    filterOption={(inputValue, option) =>
                        option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
            >
              <Input/>
            </AutoComplete>
          </Form.Item>
          <Form.Item
            name={['address', 'street']}
            noStyle
            rules={[{ required: true, message: 'Street is required' }]}
          >
            <Input style={{ width: '100%' }} placeholder="Detail address" />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Select
            style={{width: "50%"}}
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="male">male</Option>  
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
      </Form.Item>
      <Form.Item label="Job">
          <Input style={{width:"50%"}} placeholder="Jobless"/>
      </Form.Item>
      <Form.Item label="Positon">
        <AutoComplete
          style={{ width: "50%" }}
          dataSource={dataSource2}
          placeholder="Manager"
          filterOption={(inputValue, option) =>
            option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        >
          <Input/>
        </AutoComplete>
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input style={{width:"50%"}} />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: '50%' }} />
      </Form.Item>
      <Form.Item label="Is Married?">
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked
        />
      </Form.Item>
      <Form.Item label="Your Hobbies">
          <Checkbox.Group style={{ width: '100%' }}>
          <Row>
            <Col span={8}>
              <Checkbox value="sport">Sport</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="singing">Singing</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="traveling">Traveling</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="shopping">Shopping</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="reading">Reading</Checkbox>
            </Col>
          </Row>
          </Checkbox.Group>
      </Form.Item>
      <Form.Item label="Is Share?">
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked
        />
      </Form.Item>

      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SettingPrivacy