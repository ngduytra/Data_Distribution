import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {
  Button,
  Tooltip,
  Row,
  Col,
  Card,
  Avatar,
  Typography,
  Table,
  Progress,
  Rate,
  Statistic,
  Form,
  Input,
  Icon
} from 'antd';
import * as moment from 'moment';
import MusicPlayerMainContent from '../../components/musicPlayer/musicPlayerMainContent';
import {connect} from 'react-redux';
import BuyMusic from '../../components/buyMusic';
import InvestISO from '../../components/investISO';
import UsingISO from '../../components/usingISO';
import TextText from '../../components/text-text';
import InputDescription from '../../components/inputDescription';
import {getSongByID, getSongSameSinger, getRelatedUser} from '../../actions/song';
import ComponentLoading from '../../components/loading'
import FollowButton from '../../components/followButton'
import { withRouter } from 'react-router';
import {formatThousands} from '../../utils/common'
import Component404 from '../../components/404'
import {postViewMusic, getFindDataList, getUnlabelDataList,getFeedbackFile, takeFeedback, getFeedback,getUserDownload} from '../../api/userAPI'
import MusicCard from '../../components/musicCard'
import StyleLoadingCard from '../../components/musicCard/styleLoadingCard'
import UserHomeCard from '../../components/userHomeCard'
import StyleLoadingCardUser from '../../components/userHomeCard/styleLoadingCardUser'
import { green } from '@material-ui/core/colors';
import WrappedFeedback from '../../components/feedbackForm';
import FeedbackTable from '../../components/feedbackTable';


const { Paragraph, Text, Title} = Typography;
const { Countdown } = Statistic;
const { Meta } = Card;
class SongContent extends React.Component {

  state = {
    labelDataList: [],
    feedbackList:[],
    isUsing: false,
    starAmount: 0,
    amountCount: 0,
    loading: true,
    isHasSlot: false,
    objLabeler: null
  };

  componentWillReceiveProps({idMongo}){
    if (idMongo !== this.props.idMongo) {
      this.props.getSongByID(idMongo)
    }
  }
  componentDidMount(){
    // console.log(this.props.idMongo)
    this.props.getSongByID(this.props.idMongo)
    this.props.getRelatedUser()
    postViewMusic({idSongMongo: this.props.idMongo})
    
    getUserDownload(this.props.userReducer.user.addressEthereum).then(async res=>{
      getFeedbackFile(this.props.songReducer.songInfo.idFile).then(async res=>{
        if(res.length !==0){
          let stars = 0
          await Promise.all( res.map(element => {
            stars=stars + element.star
            })
          )
          this.setState({
            starAmount: Math.round(stars/res.length)
          })

        }
      })
      await Promise.all( res.map(element => {
        if (this.props.songReducer.songInfo.idFile === element.idFile){
          this.state.isUsing = true
        }
        })
      )
    })
    
    getUnlabelDataList().then(async data => {
      let pageData = []
      // console.log('alooooooasoso')
      // console.log(data)
      // let data1={
      //   idFile: this.props.songReducer.songInfo.idFile
      // }
      // console.log('alooooooasoso222222')
      // console.log(data1)
      // getFeedback(data1)
      // .then(res=>{
      //   console.log('tradivergenttttttttttttttttttt')
      //   console.log(res)
      //   this.setState({
      //     feedbackList: res
      //   })
      // })
    
      // console.log(this.state.feedbackList)
      await Promise.all( data.map(element => {
        if (this.props.songReducer.songInfo.idFile === element.idFile){
          pageData.push(element)
        }
        })
      )
      if(pageData.length !== 0){
        await Promise.all( pageData[0].arrPartLabel.map(element => {
          if ( element.labeler === "0x0000000000000000000000000000000000000000"){
            this.state.isHasSlot = true
          }
          if (element.labeler === this.props.userReducer.user.addressEthereum){

            this.setState({
              objLabeler: element,
            })
          }
          if(element.isAccept === false){
            this.state.amountCount++
          }
          })
        )
      }
      return pageData;
    })
    .then( (result)=>{
      this.setState({
        labelDataList: result,
        loading: false
      })
      // console.log("sdfadsfasdf")
      // console.log(this.state.labelDataList)
    })
  }

  render() {
    const {songInfo, songSameSingerData, relatedUserData, error} = this.props.songReducer
    if (error) return (<Component404 history={this.props.history} subTitle="This dataset not found. Please try another link!"></Component404>)
    if (!songInfo) return (<ComponentLoading/>)
    const columns = [
      {
        title: 'Address',
        dataIndex: 'labeler',
        key: 'address',
        ellipsis: true,
        render: address => <Button  style={{textAlign: 'left', padding: 0}}  type="link" onClick={() => this.props.history.push(`/page/${address}`)}>{address}</Button>
      },
      {
        title: 'Id Part',
        dataIndex: 'idPart',
        key: 'percent',
        render: percent => <Text>{percent}</Text>,
      },
      {
        title: 'Result',
        dataIndex: 'subHashLabeled',
        key: 'amount',
        render: amount => <Button  style={{textAlign: 'left', padding: 0}}  type="link" onClick={() => {window.open(`https://ipfs.jumu.tk/${amount}`,'_blank');}}>{amount}</Button>,
      }, 
    ];    
    return (
      <Row>
        <Row gutter={[0, 32]}>
          <Col span={18}>
            {/* <Row>
              <MusicPlayerMainContent musicHash={songInfo.hash} imageHash={songInfo.image} isDetail/>
            </Row> */}
            <Row style={{padding: 5, margin: 5}}>
              <Col span={8}>
                <Row>
                  <Meta 
                    style={{paddingBottom: 10}} 
                    avatar={<Avatar size={59} src={window.$linkIPFS + songInfo.userUpload.avatar}/>}
                    title={ 
                    <Button style={{textAlign: 'left', padding: 0, fontSize: 16}}  type="link" onClick={() => this.props.history.push(`/page/${songInfo.userUpload.addressEthereum}`)}>
                      <Text style={{fontSize: 18}} type="warning">{songInfo.userUpload.nickName}</Text>
                    </Button>
                    } 
                    description={<Text> {formatThousands(songInfo.follow)} Follow </Text>} 
                    />
                </Row>
                <Row>
                  <Rate disabled value={this.state.starAmount}/>
                </Row>
                <Row style={{padding: 5, margin: 5}}>
                  <Avatar shape='square' size={220} src={window.$linkIPFS + songInfo.image} alt="Dataset photo"/>
                  <Tooltip title={songInfo.name} placement="leftTop">
                    <Paragraph strong style={{fontSize: '20px', margin: '15px'}} ellipsis={{ rows: 2}}>
                      {songInfo.name}
                    </Paragraph>
                  </Tooltip>
                  {
                    songInfo.isValid == null ?
                      <Title level={3} type="danger">Unrecommend by Admin</Title>
                    :
                    songInfo.isValid ?
                      <Title level={3} type="secondary" style={{color: green}}>Recommend by Admin</Title>
                    :
                      <Title level={3} type="warning">Not Verify</Title>
                  }
                  
                </Row>
                <Row style={{padding: 5, margin: 5}}>
                  <TextText title='Price' content={songInfo.price+' DIVs'} link='link here'/>
                  <TextText title='Provider' content={songInfo.artist}  link='link here'/>
                  <TextText title='Author' content={songInfo.userUpload.nickName}  link='link here'/>
                  <TextText title='Release' content={moment(songInfo.blockTime * 1000).format('L')}/>
                  <TextText title='Visit' content={songInfo.view}/>
                  <TextText title='Download Total' content={songInfo.totalDownloader}/>
                  <TextText title='Download Week' content={songInfo.weekDownloader}/>
                  <TextText title='Contract Permission' content={songInfo.contractPermission ? 'Allow' : 'Not Allow' }/>
                  <TextText title='Labeling' content={this.state.labelDataList.length === 0 ? 'Not Use' : !this.props.songReducer.songInfo.IsLabeling ? <div>Now Using<br/> <Text>Wage: ${this.state.labelDataList[0].totalWage/this.state.labelDataList[0].partAmount}</Text></div>:'Used'} link='link here'/>
                </Row>
              </Col>
              <Col span={16}>
                <Row style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginBottom: 10, paddingBottom: 10}}>
                    <FollowButton ownerSongID={songInfo.userUpload._id} isFollowed={songInfo.isFollowed}/> 
                    <UsingISO isCompleteLabel={songInfo.IsLabeling} disabled={(this.props.userReducer.user.id !== songInfo.userUpload._id) ? true : false} idFile={songInfo.idFile} unLabelFile={this.state.labelDataList} /> 
                    <InputDescription disabled={(this.props.userReducer.user.id !== songInfo.userUpload._id) ? true : false} idMongo={this.props.idMongo}/>
                    {
                    this.state.labelDataList.length === 0 || songInfo.IsLabeling ?
                      <Button disabled={true} type="primary" ghost icon="bg-colors" onClick={this.showModal}>
                        <Text>No label</Text>
                      </Button>
                      :
                      this.state.labelDataList.map(record =>
                        <Col key={record.idFile} >
                          <InvestISO hasSlot={this.state.isHasSlot} idFile={songInfo.idFile} objLabeler={this.state.objLabeler}/>
                        </Col>
                      )
                    }
                    <BuyMusic idFile={songInfo.idFile}/>
                </Row>
                <Row style={{padding: 5, marginTop: 20 }}>
                  <Title level={4} type="secondary"> DESCRIPTION  </Title>
                  <div style={{width: '100%', maxHeight: 250, backgroundColor: 'rgb(239, 242, 245)', overflow: 'auto'}}>
                    <div style={{padding: 5, margin: 5}} dangerouslySetInnerHTML={{__html: songInfo.description}} />
                  </div>
                </Row>
                <Row style={{padding: 3, marginTop: 20}}>
                  <Title level={4} type="secondary"> LABELING INFOMATION </Title>
                  {/* {songInfo.IsISO ?
                  {false ?  
                  <div>
                  <Countdown valueStyle={{fontSize: '17px', textAlign: 'center', margin: '5px'}} value={songInfo.timeExpired * 1000} format="D Ngày H Giờ m Phút s" />
                  <Progress
                    style={{paddingRight: '10px', margin: '5px'}}
                    strokeColor={{
                      from: '#108ee9',
                      to: '#FF5733',
                    }}
                    percent={Number(parseFloat(100 - (songInfo.amountRemaining * 100 / songInfo.offerAmount)).toFixed(1))}
                    status="active"
                    showInfo
                  />
                  <TextText title='Progress' content={formatThousands(songInfo.offerAmount - songInfo.amountRemaining) + ' / ' + formatThousands(songInfo.offerAmount) + ' HAK'}/>
                  <TextText title='Total Offer Amount' content={formatThousands(songInfo.offerAmount) + ' HAK'}/>
                  <TextText title='Total Offer Percent' content={parseFloat(songInfo.offerPercent / 1000).toFixed(3) + '%'}/>
                  <TextText title='Amount Remaining' content={formatThousands(songInfo.amountRemaining) + ' HAK'}/>
                  <TextText title='Owner Percent Remaining' content={parseFloat(songInfo.ownerPercent / 1000).toFixed(3) + '%'}/>
                  <TextText title='Invest table' content=''/>
                  <Table rowKey={(record) => record.idFile} columns={columns} dataSource={songInfo.investListISO} pagination={false}/>
                  </div>
                  :
                  <Text> This song is not using ISO yet. </Text>
                  } */}
                  { this.state.labelDataList.length !== 0 ?
                    this.props.userReducer.user.id === songInfo.userUpload._id ?
                      <div>
                        <Progress
                          style={{paddingRight: '10px', margin: '5px'}}
                          strokeColor={{

                            from: '#108ee9',
                            to: '#DDDD21',
                          }}
                          percent={Number(parseFloat(100 - (this.state.amountCount * 100 / this.state.labelDataList[0].partAmount)).toFixed(1))}
                          status="active"
                          showInfo
                        />
                        {/* <TextText title='Progress' content={formatThousands(songInfo.offerAmount - songInfo.amountRemaining) + ' / ' + formatThousands(songInfo.offerAmount) + ' DIV'}/> */}
                        <TextText title='Total Wage' content={formatThousands(this.state.labelDataList[0].totalWage) + ' DIVs'}/>
                        {/* <TextText title='Total Offer Percent' content={parseFloat(songInfo.offerPercent / 1000).toFixed(3) + '%'}/> */}
                        <TextText title='Total Part' content={formatThousands(this.state.labelDataList[0].partAmount) + ' parts'}/>
                        {/* <TextText title='Owner Percent Remaining' content={parseFloat(songInfo.ownerPercent / 1000).toFixed(3) + '%'}/> */}
                        <TextText title='Labeler List' content=''/>
                        <Table rowKey={(record) => record.idFile} columns={columns} dataSource={this.state.labelDataList[0].arrPartLabel.filter(element=>element.isAccept === true)} pagination={false}/>
                      </div>
                      : 
                      <Text type="danger"> You are not allow to see this part <Icon type="smile" theme="twoTone" /> </Text>
                  :
                  <Text> This dataset is not finding labeler. </Text>
                  }
                </Row>
                <Row style={{padding: 5, marginTop: 20 }}>
                  <Row >
                    <Button style={{textAlign: 'left', padding: 0, fontSize: '20px'}}  type="link" onClick={() => {}}>
                      <Title level={4} type="secondary">DATASET WITH THE SAME PROVIDER >>></Title>
                    </Button>
                  </Row>
                  <Row gutter={[8, 0]} type="flex" justify="space-around">
                    {songSameSingerData  ?
                    (
                      songSameSingerData.length === 0 ? <Text> This user just haven't this dataset yet! </Text>
                      :
                      songSameSingerData.map((record) => {
                        return <Col key={record._id} span={8} style={{width: 170, marginTop: 20}}><MusicCard songInfo={record}/></Col>
                      })
                    )
                      
                      :
                      <React.Fragment>
                        <Col span={8} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                        <Col span={8} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                        <Col span={8} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                      </React.Fragment>
                    }
                  </Row>
                </Row>
                <Row style={{padding: 5, marginTop: 20 }}>
                  <Row >
                    <Button style={{textAlign: 'left', padding: 0, fontSize: '20px'}}  type="link" onClick={() => {}}>
                      <Title level={4} type="secondary">RELATED PROVIDER >>></Title>
                    </Button>
                  </Row>

                  <Row gutter={[8, 0]} type="flex" justify="space-around">
                    {relatedUserData ?
                      relatedUserData.map((record) => {
                        return <Col span={6} style={{width: 170, marginTop: 20}}><UserHomeCard songPage={true} user={record}/></Col>
                      })
                      :
                      <React.Fragment>
                        <Col span={8} style={{ marginTop: 20}}><StyleLoadingCardUser/></Col>
                        <Col span={8} style={{ marginTop: 20}}><StyleLoadingCardUser/></Col>
                        <Col span={8} style={{ marginTop: 20}}><StyleLoadingCardUser/></Col>
                      </React.Fragment>
                    }
                  </Row>

                </Row>
              </Col>
            </Row>
            <Row>
              <Title level={2} type="main"><u>FEEDBACK</u></Title>
              <FeedbackTable idFile={songInfo.idFile}/>
              {/* {
                this.props.pageReducer.dow
              } */}
              {
                this.state.isUsing ?
                  <div>
                    <Title level={2} type="main"><u>YOUR OPINION</u></Title>
                    <WrappedFeedback idFile={songInfo.idFile}/>
                  </div>
                  : <Text><Icon type="smile"theme="twoTone" twoToneColor="#617ECB" spin={true} /> Buy to review</Text>
              }
            </Row>
          </Col>
          <Col span={6}>
            <div style={{backgroundColor: '#e0e0e0', height: 1000}}>
              <img style={{width: '100%',height:'100%' ,objectFit: 'cover'}} src="https://ipfs.jumu.tk/QmSwC5uJkYdTTibVBFxKvRqYgnzXCU9C1fQ1sxkTUvEnkx"/>
            </div>
          </Col>
        </Row>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  songReducer: state.songReducer,
  userReducer: state.userReducer,
  pageReducer: state.pageReducer,
})

const mapDispatchToProps = (dispatch) => ({
  getSongByID: (idMongo) => dispatch(getSongByID(idMongo)),
  getSongSameSinger: (data) => dispatch(getSongSameSinger(data)),
  getRelatedUser: () => dispatch(getRelatedUser())
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongContent));