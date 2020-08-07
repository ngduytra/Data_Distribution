import React, { Component } from 'react'
import io from 'socket.io-client'
import config from '../../config'
import { AutoComplete,Divider, Button, Icon, Input, Badge, Tooltip, Dropdown, Menu, Typography, InputNumber, Modal, Avatar, Result, Table } from 'antd';
import logo from '../../images/logo.png'
import {getFaucet, getNotification, validUser, Transfer,validFile, getUserToValidate} from '../../api/userAPI'
import {showNotificationTransaction, showNotificationLoading, formatThousands, estimatedTime} from '../../utils/common'
import { connect} from 'react-redux'
import { getBalance } from '../../actions/user' 
import QRCode from 'qrcode.react'

const { Text, Paragraph } = Typography;
class Header extends Component {
    state = { 
        visible: false,
        amountFaucet: 5000000,
        notificationData: [],
        notificationCount: 0,
        loading: false,
        visible1: false,
        visible2: false,
        visibleValidateUserModal: false,
        visibleValidateFileModal: false,
        userArray: [],
        fileArray: [],
        addressTo: "",
    };
    onClickLogOut = () => {
        this.props.logOut();
        localStorage.clear();
        this.props.history.push('/login')
    }
    handleOk = () => {
      this.setState({visible: false});
      showNotificationLoading(`Transfering DIV from ${this.props.userReducer.user.userName} to ${this.state.addressTo}`)
      console.log('Heloo test') 
      console.log(this.state.addressTo)
      let data = {
          addressTo: this.state.addressTo,
          amount: this.state.amountFaucet
      }
      getFaucet(data)
      .then((txHash) => {
          showNotificationTransaction(txHash);
      })
    };
    handleValidateUser = (address, isConfirm) => {
      let data = {
          addressEthereum: address,
          isConfirm: isConfirm
      }
      console.log('jkajskjsdkdksajksdjdkd')
      console.log(data)
      validUser(data).then((result) => {
        console.log('jkajskjsdkdksajksdjdkd')
        console.log(result)
        let arrTemp = this.state.userArray;
        const index = arrTemp.indexOf(address);
        if (index > -1) {
          arrTemp.splice(index, 1);
        }
        this.setState({
          userArray: arrTemp
        })
    })
    };
    handleValidateFile = (idMongo, isConfirm) => {
      let data = {
          idMongo: idMongo,
          isConfirm: isConfirm
      }
      console.log('jkajskjsdkdksajksdjdkd')
      console.log(data)
      validFile(data).then((result) => {
        console.log('jkajskjsdkdksajksdjdkd')
        console.log(result)
        let arrTemp = this.state.fileArray;
        const index = arrTemp.indexOf(idMongo);
        if (index > -1) {
          arrTemp.splice(index, 1);
        }
        this.setState({
          fileArray: arrTemp
        })
    })
  };
    componentDidMount = () => {
      getUserToValidate().then(data => {
        this.setState({
          userArray: data.userArray,
          fileArray: data.fileArray
        })
      })
        this.props.getBalance(this.props.userReducer.user.addressEthereum)
        if(this.state.notificationData.length === 0){
          getNotification().then(result => {
            this.setState({
              notificationData: result.data,
              notificationCount: result.countFalse
            })
          })
        }
    }
    handleClickSeen = (id, index) => {
      window.$socket.emit('notification_seen', {id})
      if(!this.state.notificationData[index].isSeen){
        const temp = this.state.notificationData
        temp[index].isSeen = true
        this.setState({
          notificationData: temp,
          notificationCount: this.state.notificationCount - 1
        })
      }
    }

    componentWillMount = () => {
      const token = this.props.userReducer.user.accessToken
      if(!window.$socket){
        window.$socket = io(config.url + '/chat', {'query':{'token':token}});
      }

      window.$socket.on('notification', data => {
        const temp = this.state.notificationData;
        temp.unshift(data);
        this.setState({
          notificationCount: this.state.notificationCount + 1,
          notificationData: temp,
        })
        // this.setState({notificationData: this.state.notificationData.push(data)})
        // alert('socket notification' + data);
      })
    }

    showModal = () => {
      this.setState({
        visible1: true,
      });
    };
    showModal1 = () => {
      this.setState({
        visible: true,
      });
    };
    showValidateUserModal = () => {
      this.setState({
        visibleValidateUserModal: true,
      });
    };

    showValidateFileModal = () => {
      this.setState({
        visibleValidateFileModal: true,
      });
    };

    
    // handleOk1 = (e) => {
    //   this.setState({visible: false});
    //   showNotificationLoading(`Transfering DIV from ${this.props.userReducer.user.userName}`)
    //   let data = {
    //       address: this.props.userReducer.user.addressEthereum,
    //       amount: this.state.amountFaucet
    //   }
    //   getFaucet(data)
    //   .then((txHash) => {
    //       showNotificationTransaction(txHash);
    //   })
    // };
  
    handleCancel1 = () => {
      this.setState({ visible2: false });
    };
  
    handleCancel = () => {
      this.setState({ visible1: false });
    };
    handleValidateUserOk = () => {
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false, visibleValidateUserModal: false });
      }, 3000);
    };
  
    handleValidateUserCancel = () => {
      this.setState({ visibleValidateUserModal: false });
    };

    handleValidateFileOk = () => {
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false, visibleValidateFileModal: false });
      }, 3000);
    };
  
    handleValidateFileCancel = () => {
      this.setState({ visibleValidateFileModal: false });
    };

    warning=()=> {
      Modal.warning({
        title: 'DỮ LIỆU CÁ NHÂN!',
        content: 'Bạn sẽ phải chi trả ... cho ... bộ dữ liệu cá nhân. Hãy chắc chắn bạn muốn thực hiện giao dịch này',
      });
    }
    onChange(value) {
      console.log('changed', value);
    }

  render () {
    const {userArray, fileArray, visible, visible1, visible2, visibleValidateUserModal,visibleValidateFileModal, loading, amountFaucet, notificationCount, notificationData } = this.state
    const dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street'];
    const columnUser = [
      {
        title: 'Address',
        key: 'user',
        ellipsis: true,
        render: address => <Button style={{textAlign: 'left', padding: 0, fontSize: 14}}  type="link" onClick={() => this.props.history.push(`/page/${address}`)}>{address}</Button>
      },
      {
        title: 'Action',
        key: 'action',
        ellipsis: true,
        render: address => (
          <span>
            <Button style={{textAlign: 'left', padding: 0, fontSize: 14}}  onClick={() => this.handleValidateUser(address, true)}>Validate</Button>
            <Divider type="vertical" />
            <Button style={{textAlign: 'left', padding: 0, fontSize: 14}}  onClick={() => this.handleValidateUser(address, false)}>Delete</Button>
          </span>
        ),
      }
    ];
    const columnFile = [
      {
        title: 'ID Mongo',
        key: 'file',
        ellipsis: true,
        render: idMongo => <Button style={{textAlign: 'left', padding: 0, fontSize: 14}}  type="link" onClick={() => this.props.history.push(`/data/${idMongo}`)}>{idMongo}</Button>
      },
      {
        title: 'Action',
        key: 'action',
        ellipsis: true,
        render: idMongo => (
          <span>
          <span>
            <Button style={{textAlign: 'left', padding: 0, fontSize: 14}}  onClick={() => this.handleValidateFile(idMongo, true)}>Validate</Button>
            <Divider type="vertical" />
            <Button style={{textAlign: 'left', padding: 0, fontSize: 14}}  onClick={() => this.handleValidateFile(idMongo, false)}>Delete</Button>
          </span>
          </span>
        ),
      }
    ];
    let menuNotification = (
      <Menu>
        {notificationData.map((record, index) => 
            this.props.userReducer.user.id === record.senderID ? 
              <Menu.Item style={{display: 'flex', alignItems: 'center', backgroundColor: record.isSeen ? '#f5f5f5' : ''}} onClick={()=> this.handleClickSeen(record._id, index)}>
                <Avatar 
                  shape='square'
                  size={48} 
                  src={window.$linkIPFS + record.songImage}
                />
                <div style={{height: 50, marginLeft: 10}}>
                  <Paragraph style={{marginBottom: 7}} ellipsis>{record.contentSender}</Paragraph>
                  {record.type === 1 ?
                  <Paragraph type="secondary" style={{marginBottom: 0}} ellipsis>Đang chờ <Text code>xác thực bản quyền dữ liệu</Text> trên hệ thống.</Paragraph>
                  :
                  record.type === 2 ?
                  <Paragraph type="secondary" style={{marginBottom: 0}} ellipsis>Bạn bị trừ vào ví <Text code>{formatThousands(record.money)}</Text> DIV.</Paragraph>
                  :
                  record.type === 3 ?
                  <Paragraph type="secondary" style={{marginBottom: 0}} ellipsis>Thời gian cho phép đầu tư còn <Text code>{estimatedTime(record.money)}</Text></Paragraph>
                  :
                  record.type === 4 ?
                  <Paragraph type="secondary" style={{marginBottom: 0}} ellipsis>Bạn bị trừ vào ví <Text code>{formatThousands(record.money)}</Text> DIV.</Paragraph>
                  :
                  record.type === 6 ?
                  <Paragraph type="secondary" style={{marginBottom: 0}} ellipsis>Vui lòng <Text code>Approved</Text> nếu đã chấp nhận hợp đồng</Paragraph>
                  :
                  record.type === 7 ?
                  <Paragraph type="secondary" style={{marginBottom: 0}} ellipsis>Vui lòng <Text code>Chờ</Text> đối tác chấp nhận hợp đồng</Paragraph>
                  :
                  record.type === 8 ?
                  <Paragraph type="secondary" style={{marginBottom: 0}} ellipsis>Vui lòng <Text code>Kiểm tra</Text> lại số dư</Paragraph>
                  :
                  record.type === 9 ?
                  <Paragraph type="secondary" style={{marginBottom: 0}} ellipsis>Bạn phải chịu <Text code> tiền bồi thường</Text> vì hành động này</Paragraph>
                  :
                  record.type === 10 ?
                  <Paragraph type="secondary" style={{marginBottom: 0}} ellipsis>Bây giờ bạn là <Text code>Chủ sở hữu</Text> bộ dữ liệu này trên hệ thống</Paragraph>
                  :
                  null
                }
                  </div>
             </Menu.Item>
            :
              <Menu.Item style={{display: 'flex', alignItems: 'center', backgroundColor: record.isSeen ? '#f5f5f5' : ''}} onClick={()=> this.handleClickSeen(record._id, index)}>
                {
                  record.type === 5 || record.type === 6 || record.type === 7 || record.type === 8 || record.type === 9 ? 
                  <Avatar 
                    shape='square'
                    size={48} 
                    src={window.$linkIPFS + record.songImage}
                  />
                  :
                  <Avatar 
                    shape='circle'
                    size={48} 
                    src={window.$linkIPFS + record.senderAvatar}
                  />
                }
                <div style={{height: 50, marginLeft: 10}}>
                  <Paragraph style={{marginBottom: 7}} ellipsis>{record.contentReceiver}</Paragraph>
                  {
                    record.type === 6 ?
                    <Paragraph type="secondary" style={{marginBottom: 0}} ellipsis>Vui lòng <Text code>Kiểm tra</Text> lại hợp đồng này</Paragraph>
                    :
                    record.type === 7 ?
                    <Paragraph type="secondary" style={{marginBottom: 0}} ellipsis>Vui lòng <Text code>Confirm</Text> hợp đồng trên Blockchain </Paragraph>
                    :
                    record.type === 8 ?
                    <Paragraph type="secondary" style={{marginBottom: 0}} ellipsis>Vui lòng <Text code>Kiểm tra</Text> lại số dư</Paragraph>
                    :
                    record.type === 9 ?
                    <Paragraph type="secondary" style={{marginBottom: 0}} ellipsis>Bạn nhận được <Text code>tiền bồi thường</Text></Paragraph>
                    :
                    <Paragraph type="secondary" style={{marginBottom: 0}} ellipsis>Bạn được cộng thêm vào ví <Text code>{formatThousands(record.money)}</Text> DIV</Paragraph>
                  }
                </div>
              </Menu.Item>
          )}
      </Menu>
    )
    const menu = (
        <Menu>
            <Menu.Item onClick={() => {window.location.href=`https://kovan.etherscan.io/token/${config.tokenAddress}?a=${this.props.userReducer.user.addressEthereum}`;}}>
                <Icon type="pay-circle" style={{ color: '#1da1f2', fontSize: 15, margin: 5}} />
                <Text>{formatThousands(this.props.userReducer.user.HAK)} DIV</Text>
            </Menu.Item>
            <Menu.Item onClick={() => {window.location.href=`https://kovan.etherscan.io/address/${this.props.userReducer.user.addressEthereum}`;}}>
                <Icon type="dollar" style={{ color: '#1da1f2', fontSize: 15, margin: 5}} />
                <Text>{this.props.userReducer.balanceETH} ETH</Text>
            </Menu.Item>
            <Menu.Divider />
          <Menu.Item onClick={()=> this.props.history.push('/contractFormManager')}>
            <Icon type="solution" style={{ color: '#1da1f2', fontSize: 15, margin: 5}} />
            <Text>Contract form manager</Text>
          </Menu.Item>
          <Menu.Item onClick={()=> this.props.history.push('/find-data')}>
            <Icon type="file-search" style={{ color: '#1da1f2', fontSize: 15, margin: 5}} />
            <Text>Post request find data</Text>
          </Menu.Item>
          <Menu.Item onClick={()=> this.props.history.push('/setting')}>
            <Icon type="setting" style={{ color: '#1da1f2', fontSize: 15, margin: 5}}/>
            <Text>Setting</Text>
          </Menu.Item>
          <Menu.Item onClick={()=> this.props.history.push('/set-personal-data')}>
            <Icon type="edit" style={{ color: '#1da1f2', fontSize: 15, margin: 5}}/>
            <Text>Set Personal Data</Text>
          </Menu.Item>

          {
          this.props.userReducer.user.isAdmin ? 
            <Menu.Item onClick={this.showValidateUserModal}>
              <Icon type="edit" style={{ color: '#1da1f2', fontSize: 15, margin: 5}}/>
              <Text>validate User</Text>
            </Menu.Item>
          : null
          }

        {
         this.props.userReducer.user.isAdmin ? 
          <Menu.Item onClick={this.showValidateFileModal}>
              <Icon type="edit" style={{ color: '#1da1f2', fontSize: 15, margin: 5}}/>
              <Text>Validate File</Text>
            </Menu.Item>

          : null
        }
          {/* <Menu.Item onClick={() => {this.setState({visible: true})}}>
            <Icon type="transaction" style={{ color: '#1da1f2', fontSize: 15, margin: 5}}/>
            <Text>Faucet</Text>
          </Menu.Item> */}
          <Menu.Divider />
          <Menu.Item onClick={()=> this.onClickLogOut()}>
            <Icon type="logout" style={{ color: '#1da1f2', fontSize: 15, margin: 5}}/>
            <Text>Log Out</Text>
          </Menu.Item>
        </Menu>
      );
    return (
      <div style={{borderBottom: '1px solid #D6DBDF', height: 60, display: 'flex' ,justifyContent: 'center'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center' , width: 1200}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Tooltip placement="topLeft" title="Data Distribution" arrowPointAtCenter>
                    <img src={logo} onClick={()=> this.props.history.push('/home')} alt="Data Distribution" style={{ width: "40px", height: "40px"}} />
                    {/* <Text strong style={{fontSize: 20}}>Data Distribution</Text> */}
                </Tooltip>
            </div>
            <div>
                {/* <Button disabled type="text" style={{color: '#424242', marginLeft: 5}} >RANKING</Button>
                <Button disabled type="text" style={{color: '#424242', marginLeft: 5}} >EVENTS</Button> */}
                <Button ghost style={{color: '#424242', marginLeft: 5}} onClick={()=> this.props.history.push('/survey/intro')} >SURVEY</Button>
                <Button ghost style={{color: '#424242', marginLeft: 5}} onClick={()=> this.props.history.push('/labeling')} >LABELING</Button>
                <Button ghost style={{color: '#424242', marginLeft: 5}} onClick={()=> this.props.history.push('/martketplaceFindData')} >FIND DATA</Button>
                <Button ghost style={{color: '#424242', marginLeft: 5}} onClick={()=> this.props.history.push('/contract')} >CONTRACTS</Button>
                <Button ghost style={{color: '#424242', marginLeft: 5}} onClick={()=> this.props.history.push('/upload')} >UPLOAD</Button>
                <Button ghost type="primary" style={{color: '#D80000'}} onClick={this.warning}>GET PERSONAL DATA</Button>
                <Button type="primary" style={{marginLeft: 5}} onClick={this.showModal}>RECEIVE</Button>
                <Button type="primary" style={{marginLeft: 5}} onClick={this.showModal1}>TRANSFER</Button>
                <Modal
                  visible={visible1}
                  title={<h2>Div Wallet Address</h2>}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  footer={[
                    <Button key="back" onClick={this.handleCancel}>
                      OK
                    </Button>,
                  ]}
                >
                  <QRCode
                    id='qrcode'
                    value={this.props.userReducer.user.addressEthereum}
                    size={290}
                    level={'H'}
                    includeMargin={true}
                  />
                </Modal>
                <Modal
                  visible={visible2}
                  title={<h2>Transfer</h2>}
                  onOk={this.handleOk1}
                  onCancel={this.handleCancel1}
                  footer={[
                    <Button key="back" onClick={this.handleCancel1}>
                      Return
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={this.handleOk1}>
                      Submit
                    </Button>
                  ]}
                >
                  <InputNumber
                    placeholder= "AMOUNT"
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={this.onChange}
                    min={1}
                    max={this.props.userReducer.user.HAK}
                  />
                  <Input placeholder="To"/> 
                  <div>
                    <h3>Your Account: {this.props.userReducer.user.addressEthereum}</h3>
                    <b>Balance: {this.props.userReducer.user.HAK} DIVs</b>
                  </div>
                  
                  {/* Form.create()(<Form>
                      <Form.Item label="To">
                        {getFieldDecorator('address',
                        )(<Input />)}
                      </Form.Item>
                      <Form.Item label="Password" hasFeedback>
                        {getFieldDecorator('password', {
                          rules: [
                            {
                              required: true,
                              message: 'Please input your password!',
                            },
                            {
                              validator: this.validateToNextPassword,
                            },
                          ],
                        })(<Input.Password />)}
                      </Form.Item>
                    </Form>) */}
                </Modal>
                <Modal
                  visible={visibleValidateUserModal}
                  title={<h2>Users to validate</h2>}
                  onOk={this.handleValidateUserOk}
                  onCancel={this.handleValidateUserCancel}
                  footer={[
                    <Button key="back" onClick={this.handleValidateUserCancel}>
                      Return
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={this.handleValidateUserOk}>
                      Submit
                    </Button>,
                  ]}
                >
                  <Table columns={columnUser} dataSource={userArray} />
                  {/* Form.create()(<Form>
                      <Form.Item label="To">
                        {getFieldDecorator('address',
                        )(<Input />)}
                      </Form.Item>
                      <Form.Item label="Password" hasFeedback>
                        {getFieldDecorator('password', {
                          rules: [
                            {
                              required: true,
                              message: 'Please input your password!',
                            },
                            {
                              validator: this.validateToNextPassword,
                            },
                          ],
                        })(<Input.Password />)}
                      </Form.Item>
                    </Form>) */}
                </Modal>
                <Modal
                  visible={visibleValidateFileModal}
                  title={<h2>Files to validate</h2>}
                  onOk={this.handleValidateFileOk}
                  onCancel={this.handleValidateFileCancel}
                  footer={[
                    <Button key="back" onClick={this.handleValidateFileCancel}>
                      Return
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={this.handleValidateFileOk}>
                      Submit
                    </Button>,
                  ]}
                >
                  <Table columns={columnFile} dataSource={fileArray} />
                  {/* Form.create()(<Form>
                      <Form.Item label="To">
                        {getFieldDecorator('address',
                        )(<Input />)}
                      </Form.Item>
                      <Form.Item label="Password" hasFeedback>
                        {getFieldDecorator('password', {
                          rules: [
                            {
                              required: true,
                              message: 'Please input your password!',
                            },
                            {
                              validator: this.validateToNextPassword,
                            },
                          ],
                        })(<Input.Password />)}
                      </Form.Item>
                    </Form>) */}
                </Modal>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Tooltip placement="topLeft" title="Home Page" arrowPointAtCenter>
                      <Avatar 
                      shape='circle'
                      size={35} 
                      src={window.$linkIPFS + this.props.userReducer.user.avatar}
                      onClick={()=> {
                        this.props.userReducer.user.userName ?
                        this.props.history.push(`/page/${this.props.userReducer.user.userName}`) :
                        this.props.history.push(`/page/${this.props.userReducer.user.addressEthereum}`)
                      }}
                      />   
                </Tooltip>
                <Tooltip placement="topLeft" title="Notification" arrowPointAtCenter>
                  <Dropdown placement="bottomCenter" trigger={['click']} overlay={menuNotification} overlayStyle={{width:500 }}>
                    <Badge count={notificationCount}>
                        <Icon type="bell" style={{ color: '#1da1f2', fontSize: 25, paddingLeft: 17 }} />
                    </Badge>
                  </Dropdown>
                </Tooltip>
                <Tooltip placement="topLeft" title="Message" arrowPointAtCenter>
                    <Badge count={0}>
                        <Icon type="message" onClick={()=> this.props.history.push('/message')} style={{ color: '#1da1f2', fontSize: 25, paddingLeft: 17 }} />
                    </Badge>
                </Tooltip>
                <Tooltip placement="topLeft" title="Contract" arrowPointAtCenter>
                    <Badge count={0}>
                        <Icon type="profile" style={{ color: '#1da1f2', fontSize: 25, paddingLeft: 17 }} />
                    </Badge>
                </Tooltip>
                <Dropdown overlay={menu} trigger={['click']}>
                    <Icon type="caret-down" style={{ color: '#1da1f2', fontSize: 25, paddingLeft: 17 }} />
                </Dropdown>
            </div>
        </div>
        <Modal
            title="Transfer DIV"
            width={250}
            visible={visible}
            onOk={this.handleOk}
            onCancel={() => {this.setState({visible: false})}}
            >
            <InputNumber
                defaultValue={amountFaucet}
                min={1000000}
                max={10000000}
                style={{width: 150, marginBottom: 20,marginRight: 10}}
                formatter={value =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={value => value.replace(/\$\s?|(,*)/g, "")}
                onChange={e => {this.setState({ amountFaucet: e })}}
            />
            <span className="ant-form-text"> DIV</span>
            <p className="ant-form-text">Address To</p>
            <Input
                // style={{width: 400, marginBottom: 20,marginRight: 10}}
                onChange={e => {
                  console.log(e.target.value)
                  this.setState({ addressTo: e.target.value })
                }}
                 />
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
})

const mapDispatchToProps = (dispatch) => ({
  getBalance: (userAddress) => dispatch(getBalance(userAddress)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);