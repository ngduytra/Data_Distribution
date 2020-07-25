import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Icon, Input, Button, Checkbox, Modal, Typography, Table } from 'antd';
import {connect} from 'react-redux';
import { login, signin_fail_handle} from '../../actions/user'
import login1 from '../../torus-login.svg';
const { Text } = Typography;

class LoginForm extends React.Component {
  state = {
    isloading: false,
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({isloading: true})
        this.props.login(values.email, values.password)
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    if(this.props.userReducer.error){
      this.setState({isloading: false})
      Modal.error({
        title: 'Login error message ',
        content: this.props.userReducer.error,
      });
      this.props.signin_fail_handle();
    }
    if(this.props.userReducer.signinSuccessful){
      this.props.history.push('/home')
      Modal.success({
        title: 'DATA DISTRIBUTION',
        content:
        (
          <div>
            <Text >Dida (Data Distribution) là hệ thống phân phối dữ liệu được phát triển dựa trên nền tảng công nghệ
            Blockchain. Qua đó đạt được các tính minh bạch và an ninh và quan trọng nhất là trao quyền kiểm soát dữ
            người dùng. Ngoài ra hệ thống còn có các tính năng giúp người dùng kiếm tiền như tìm dữ liệu hộ, bán dữ
            liệu cá nhân. Hệ thống được thiết kế theo chuẩn GDPR(General Data Protection Regulation)</Text>
          </div>
        )
      });
      
    }
    return (
      <div className="wrap-form-login">
        <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a href='' className="login-form-forgot">
            Forgot password
          </a>
          <Button loading={this.state.isloading} type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button> 
          Or<Button onClick={()=>this.props.history.push('/register')} type="link">register now!</Button>
        </Form.Item>
        <Form.Item>
              <div className='container-custom'>
                <img alt='' src={login1} onClick={this.login} className='gif-load' />
              </div>  
        </Form.Item>
      </Form>
      </div>
    );
  }
}

const WrappedLoginForm = Form.create({ name: 'normal_login' })(LoginForm);

const mapStateToProps = (state) => ({
  userReducer: state.userReducer
})

const mapDispatchToProps = (dispatch) => ({
  login: (email, password)=>dispatch(login(email, password)),
  signin_fail_handle: ()=>dispatch(signin_fail_handle()),
})

export default connect(mapStateToProps, mapDispatchToProps)(WrappedLoginForm)