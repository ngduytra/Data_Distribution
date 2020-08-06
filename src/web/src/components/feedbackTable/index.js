import React, { Component } from 'react'
import { List, Avatar, Icon,Rate,Text, Typography } from 'antd';
import config from '../../config'
import {getFeedbackFile, getUnlabelDataList} from '../../api/userAPI'
const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

  const { Title} = Typography;

export class FeedbackTable extends Component {
    state = {
        listData: [],
    };
    componentDidMount(){
        
        // getUnlabelDataList().then(async res=>{
        //     console.log('hueeeeeeeeeeoiiiii')
        //     console.log(res)
        // })
        getFeedbackFile(this.props.idFile).then(async res=>{
            this.setState({
                listData:res
            })
        })
        // getFeedback(data).then(async(result) => {
        //     const feedbackList = []
        //     await Promise.all( result.map(element => {
        //           feedbackList.push(element)
        //         })
        //       )
        //       console.log('hueeeeeeeeeeoiiiii')
        //       console.log(feedbackList)
        //     return feedbackList
        //   }).then((res)=>{
        //     this.setState({
        //         listData: res
        //     })
        //   })
        }
    render() {
        // for (let i = 0; i < this.state.listData.length; i++) {
        //     this.state.listData[i].push({
        //         href: `${config.url}/page/${this.state.listData[i].user.addressEthereum}`,
        //         title: `${this.state.listData.}`,
        //         avatar: `${config.ipfs_url}/${this.state.listData[i].user.avatar}`,
        //         description:
        //         'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        //         content:
        //         'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        //     });
        //     }
        return (
            <div>{
                    this.state.listData.length !== 0 ?
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 3,
                            }}
                            dataSource={this.state.listData}
                            footer={
                            <div>
                                <b>Data distribution</b> footer part
                            </div>
                            }
                            renderItem={item => (
                            <List.Item
                                key={item.user.nickName}
                                actions={[
                                <IconText type="star-o" text="132" key="list-vertical-star-o" />,
                                <IconText type="like-o" text="156" key="list-vertical-like-o" />,
                                <IconText type="message" text="4" key="list-vertical-message" />,
                                ]}
                                // extra={
                                // <img
                                //     width={272}
                                //     alt="logo"
                                //     src={`${config.ipfs_url}/${item.user.avatar}`}
                                // />
                                // }
                            >
                                <List.Item.Meta
                                avatar={<Avatar src={`${config.ipfs_url}/${item.user.avatar}`} />}
                                title={<a href={item.href}>{item.user.nickName}</a>}
                                description={<Rate disabled value={item.star}/>}
                                />
                                {item.content}
                            </List.Item>
                            )}
                        />
                        : <Title type="danger">No reviews <Icon type="smile"theme="twoTone" twoToneColor="#617ECB" spin={true} /></Title>
                }
            </div>
        )
    }
}

export default FeedbackTable