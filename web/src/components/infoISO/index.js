import React from 'react';
import 'antd/dist/antd.css';
import './InfoISO.css'
// import InvestISO from '../../components/investISO'
import ShowDetailFindData from '../../components/showDetailFindData'
import { Card, Progress, Statistic, Avatar, Typography, Button, Descriptions } from 'antd';
import { withRouter } from 'react-router';
import * as moment from 'moment';
import {formatThousands} from '../../utils/common'

const { Meta } = Card;
const { Countdown } = Statistic;
const { Text } = Typography;

class InfoISO extends React.Component {
  render() {
    let { record, action }= this.props
    
    return (
      <Card
      hoverable
      style={{ width: '100%' , display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',border: '2px solid green'}}
      // cover={<img className="img-background-music" alt="music background" src={window.$linkIPFS + record.music.image}/>}
      bodyStyle={{padding: '15px', width: '100%', border: '2px solid green'}}
      actions={action ? [
        // <InvestISO idFile={record.idFile} center/>,
        <ShowDetailFindData history={this.props.history} infor={record}/>,
      ] : null
    }
    >
      <Button  style={{textAlign: 'center', padding: 0, fontSize: 'large', height: 20, width: '100%'}}  type="link" onClick={()=> this.props.history.push(`/home`)}>{record.IPFS.name}</Button>
      <Descriptions title="Information" column={1} bordered={true} layout='horizontal'>
        <Descriptions.Item label={<b style={{color:'#125358'}}>Row</b>}>{record.IPFS.rowAmount}</Descriptions.Item>
        <Descriptions.Item label={<b style={{color:'#125358'}}>Reward</b>}>{record.IPFS.reward}</Descriptions.Item>
        <Descriptions.Item label={<b style={{color:'#125358'}}>Field</b>}>{record.IPFS.field}</Descriptions.Item>
      </Descriptions>
      <Meta 
        style={{ marginTop: 10, alignContent: 'center', paddingLeft: 40}} 
        avatar={<Avatar size={30} src={window.$linkIPFS + record.user.avatar} alt={record.user.nickName}/>} 
        title={ 
        <Button style={{textAlign: 'center', fontSize: 13, padding:0}}  type="link" onClick={() => this.props.history.push(`/page/${record.user.addressEthereum}`)}>
          <Text style={{fontSize: 13}} type="warning">{record.user.nickName}</Text>
        </Button>
        }   
        description={<Text style={{fontSize: 10}}> {formatThousands(record.user.follow)} Follow </Text>} 
        />
        {/* <Meta 
          title={
            <Tooltip style={{display: 'flex', flexDirection: 'column'}} title={songInfo.name} placement="top" onClick={() => this.props.history.push(`/song/${ songInfo._id}`)} >
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <Button style={{textAlign: 'left', padding: 0, fontSize: 13, height: 20,  width: '100%'}}  type="link" >{songInfo.name}</Button>
              <Text style={{fontSize: 13}} type="secondary">{songInfo.artist}</Text>
            </div>
            </Tooltip>
            }
          description={
            <Tooltip style={{display: 'flex'}} title={songInfo.userUpload.nickName} placement="bottom" onClick={() => this.props.history.push(`/page/${songInfo.userUpload.addressEthereum}`)} >
              <Avatar shape='circle' style={{marginRight: 5}} size='small' src={window.$linkIPFS + songInfo.userUpload.avatar } />   
              <Button style={{textAlign: 'left', padding: 0, fontSize: 14, height: 20, width: '70%', overflow: 'hiden'}} type="link" ><Text type="warning" style={{alignSelf: 'center'}} >{songInfo.userUpload.nickName}</Text></Button>
            </Tooltip>
            }
          /> */}
    </Card>
    )
  }
}

export default withRouter(InfoISO)
