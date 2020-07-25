
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { 
  Row,
  Col,
  Carousel,
  Typography,
  Icon
 } from 'antd';
import {connect} from 'react-redux';
import Ranking from '../../components/ranking'
import UserHomeCard from '../../components/userHomeCard'
import StyleLoadingCardUser from '../../components/userHomeCard/styleLoadingCardUser'
import MusicCard from '../../components/musicCard'
import InfoISO from '../../components/infoISO'
import StyleLoadingCard from '../../components/musicCard/styleLoadingCard'
import { getHomeSongs, getHotUsers, getFindDataList} from '../../actions/app'

const { Title } = Typography;
const dataset = [
  {
    hash:"QmeZ126KyJwibjZt22kAbB6LcoJ5UwWHCupWfNvvp4vT7D",
    image: "QmbBV9r6N8vYR1SZjFePgnxveRWqEKmksBrLWQVau527WE",
    name: "Fatal Police Shootings in the US",
    tags: ["sport", "history"],
    userUpload:{
      addressEthereum: "0x4b771cDB9702eDa44311CE20984Dc4930d16674C",
      avatar: "Qmdq7uiGfeMJYUGA2ygFKHQac5sRrBFwJyFowePVd7t8pc",
      nickName: "Divergent",
      _id: "5dd9f49c61619708f47e070b",
      view: 0,
      _id: "5ed93e1d34225d437265b648"
    }
  },
  {
    hash:"QmeZ126KyJwibjZt22kAbB6LcoJ5UwWHCupWfNvvp4vT7D",
    image: "QmXhmWYuQ2kik7Qku2zJ4yLCiFbZPhy73xipihnXWRkT47",
    name: "COVID-19 Open Research Dataset Challenge (CORD-19)",
    tags: ["sport", "history"],
    userUpload:{
      addressEthereum: "0x4b771cDB9702eDa44311CE20984Dc4930d16674C",
      avatar: "Qmdq7uiGfeMJYUGA2ygFKHQac5sRrBFwJyFowePVd7t8pc",
      nickName: "Pisces",
      _id: "5dd9f49c61619708f47e070b",
      view: 0,
      _id: "5ed93e1d34225d437265b648"
    }
  },
  {
    hash:"QmeZ126KyJwibjZt22kAbB6LcoJ5UwWHCupWfNvvp4vT7D",
    image: "QmP7c3vCnq5n6A6LBbCXKZ7v4uVKyA4SB4w4LvkNtGTFfP",
    name: "Global Significant Earthquake Database from 2150BC",
    tags: ["sport", "history"],
    userUpload:{
      addressEthereum: "0x4b771cDB9702eDa44311CE20984Dc4930d16674C",
      avatar: "Qmdq7uiGfeMJYUGA2ygFKHQac5sRrBFwJyFowePVd7t8pc",
      nickName: "Keyti Đẹp Trai",
      _id: "5dd9f49c61619708f47e070b",
      view: 0,
      _id: "5ed93e1d34225d437265b648"
    }
  },
  {
    hash:"QmeZ126KyJwibjZt22kAbB6LcoJ5UwWHCupWfNvvp4vT7D",
    image: "QmddmTD5DkrxEgCyTgwxM3gVvfCAuigSUFUJSnF7wXJ7Po",
    name: "Zomato Restaurants Hyderabad",
    tags: ["sport", "history"],
    userUpload:{
      addressEthereum: "0x4b771cDB9702eDa44311CE20984Dc4930d16674C",
      avatar: "Qmdq7uiGfeMJYUGA2ygFKHQac5sRrBFwJyFowePVd7t8pc",
      nickName: "Jean",
      _id: "5dd9f49c61619708f47e070b",
      view: 0,
      _id: "5ed93e1d34225d437265b648"
    }
  },
]

const user = [
  {
    addressEthereum: "0x38F01a252ac6D7D447f84ED6F34Ff7Fe624EFe48",
    avatar: "QmWGG6UuHzo6HJ1mhPoYibn3XXWZKMbVAogwnCackdC4rQ",
    follow: 3,
    isFollowed: false,
    nickName: "South China Morning Post",
    view: 1672,
    _id: "5dfdcd78228b790018bd5688"
  },
  {
    addressEthereum: "0xE802AfaD1E6BFd96b777e40d211C376bfD51C4a4",
    avatar: "Qmep8NRTDnv7gxr2gXS4uXmcdxQuBZP8bnVpFmX8NCWjsw",
    follow: 3,
    isFollowed: true,
    nickName: "Nanba Colanda",
    view: 1524,
    _id: "5e12b88f990ce80011767802"
  },
  {
    addressEthereum: "0x16C7E1209AdCf05dFFBCc4ABAc5679a10273d95D",
    avatar: "QmYrnDDQvTgNU8PwgNw4n3CQriwtZ75wLdnjziX8pDPEVA",
    follow: 1,
    isFollowed: false,
    nickName: "University of Washington",
    view: 1413,
    _id: "5e12b886990ce80011767801"
  },
  {
    addressEthereum: "0xC8E7cc478a6d1D7F894FE05B464c52b92f2c1DA0",
    avatar: "QmcnhpBYygv2QJnBZJfy51bKQ5HaugbWRW9fbRSosTt96w",
    follow: 3,
    isFollowed: false,
    nickName: "Our World in Data",
    view: 1374,
    _id: "5dfc576d212a98001823033d"
  }
]

class HomeContent extends Component {
  componentDidMount(){
    this.props.getHomeSongs()
    this.props.getHotUsers()
    this.props.getFindDataList()
    console.log(this.props)
  }
  render() {
    const {appReducer} = this.props
    return (
    <div >
      <Row gutter={[8, 0]}>
        <Carousel autoplay>
          <div>
            <img style={{width: '100%', height: '400px', objectFit: 'cover'}} alt="Dataset" src={window.$linkIPFS + "QmTX8PxaY9KPJfddacFS8Fo8zt8bvDuVsJCVsb2yVCVx4o"}/>
          </div>
          <div>
            <img style={{width: '100%', height: '400px', objectFit: 'cover'}} alt="Dataset" src={window.$linkIPFS + "QmSaMmyLr4ckwS4uh8Y55RjjoetkVJKceRW5k68qqwywrL"}/>
          </div>
          <div>
            <img style={{width: '100%', height: '400px', objectFit: 'cover'}} alt="Dataset" src={window.$linkIPFS + "QmVNViTuQAcE7wWGtwctRi8AtTvVgfLGrAD3B8YsB53ttP"}/>
          </div>
        </Carousel>
              
      </Row>
    
      <Row gutter={[24, 0]} style={{marginTop: 20}}>
        <Col span={17}>

        <Row gutter={[8, 0]} style={{marginTop: 20}}>
              <Col span={10}><Title level={4} type="secondary">THE MOST HEAD DATASET</Title></Col>
              <Col span={2}></Col>
              <Col span={6}></Col>
              <Col span={6} justify="end"><Icon type="double-right" /></Col>
            </Row>
            <Row gutter={[8, 0]} type="flex" justify="space-around">
              {appReducer.homeData  ?
                appReducer.homeData.mostView.map((record) => {
                  return <Col key={record._id} span={6} style={{width: 190, marginTop: 20}}><MusicCard songInfo={record}/></Col>
                })
                 :
                <React.Fragment>
                  <Col span={5} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                  <Col span={5} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                  <Col span={5} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                  <Col span={5} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                </React.Fragment>
              }
            </Row>
            <Row gutter={[8, 0]} style={{marginTop: 20}} >
              <Col span={6}><Title level={4} type="secondary">DATASET TO HUNT</Title></Col>
              <Col span={6}></Col>
              <Col span={6}></Col>
              <Col span={6} justify="end"><Icon type="double-right"  onClick={()=>this.props.history.push('/martketplaceFindData')}/></Col>
            </Row>
            <Row gutter={[8, 0]} type="flex" justify="space-around">
              {appReducer.huntData  ? 
                appReducer.huntData.map((record) => {
                  return <Col key={record._id} span={8} style={{ marginTop: 20}}>
                    <InfoISO
                      record={record}
                      action={true}
                    />
                    </Col>
                })
                :
                <React.Fragment>
                  <Col span={7} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                  <Col span={7} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                  <Col span={7} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                </React.Fragment>
              }
            </Row>

            <Row gutter={[8, 0]} style={{marginTop: 20}} >
              <Col span={6}><Title level={4} type="secondary">THE HOT SURVEY</Title></Col>
              <Col span={6}></Col>
              <Col span={6}></Col>
              <Col span={6} justify="end"><Icon type="double-right"/></Col>
            </Row>

            <Row gutter={[8, 0]} type="flex" justify="space-around">
              {/* {appReducer.homeData  ?
                appReducer.homeData.mostNew */}
                {dataset.map((record) => {
                  return <Col key={record._id} span={6} style={{width: 190, marginTop: 20}}><MusicCard songInfo={record}/></Col>
                })}
                {/* :
                <React.Fragment>
                  <Col span={5} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                  <Col span={5} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                  <Col span={5} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                  <Col span={5} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                  <Icon span={4} type="double-right" onClick={()=> this.props.history.push('/upload')}/>
                </React.Fragment>
              } */}
            </Row>
            <Row gutter={[8, 0]} style={{marginTop: 20}} >
              <Col span={6}><Title level={4} type="secondary">NEW UPLOAD</Title></Col>
              <Col span={6}></Col>
              <Col span={6}></Col>
              <Col span={6} justify="end"><Icon type="double-right" /></Col>
            </Row>

            <Row gutter={[8, 0]} type="flex" justify="space-around">
              {appReducer.homeData  ?
                appReducer.homeData.mostNew.map((record) => { 
                  return <Col key={record._id} span={6} style={{width: 190, marginTop: 20}}><MusicCard songInfo={record}/></Col>
                })
                 :
                <React.Fragment>
                  <Col span={6} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                  <Col span={6} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                  <Col span={6} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                  <Col span={6} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                </React.Fragment>
              }
            </Row>

            <Row  gutter={[8, 0]} style={{marginTop: 20}} >
              <Col span={6}><Title level={4} type="secondary">HOT PROVIDER</Title></Col>
              <Col span={6}></Col>
              <Col span={6}></Col>
              <Col span={6} justify="end"><Icon type="double-right" /></Col>
            </Row>

            <Row gutter={[8, 0]} type="flex" justify="space-around">
              {(appReducer.hotUserData) ?
                appReducer.hotUserData.map((record) => {
                  return <Col key={record._id} span={6} style={{width: 180, marginTop: 20}}><UserHomeCard user={record}/></Col>
                })
                :
                <React.Fragment>
                  <Col span={6} style={{ marginTop: 20}}><StyleLoadingCardUser/></Col>
                  <Col span={6} style={{ marginTop: 20}}><StyleLoadingCardUser/></Col>
                  <Col span={6} style={{ marginTop: 20}}><StyleLoadingCardUser/></Col>
                  <Col span={6} style={{ marginTop: 20}}><StyleLoadingCardUser/></Col>
                </React.Fragment>
              }
            </Row>


            {/* <Row gutter={[8, 0]} style={{marginTop: 20}} >
              <Title level={4} type="secondary">NEW RELEASE</Title>
            </Row>

            <Row gutter={[8, 0]} type="flex" justify="space-around">
              {appReducer.homeData  ?
                appReducer.homeData.mostNew.map((record) => {
                  return <Col key={record._id} span={6} style={{width: 190, marginTop: 20}}><MusicCard songInfo={record}/></Col>
                })
                :
                <React.Fragment>
                  <Col span={6} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                  <Col span={6} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                  <Col span={6} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                  <Col span={6} style={{ marginTop: 20}}><StyleLoadingCard/></Col>
                </React.Fragment>
              }
            </Row>

            <Row  gutter={[8, 0]} style={{marginTop: 20}}>
              <Title level={4} type="secondary">HOT SINGER</Title>
            </Row>

            <Row gutter={[8, 0]} type="flex" justify="space-around">
              {(appReducer.hotUserData) ?
                appReducer.hotUserData.map((record) => {
                  return <Col key={record._id} span={6} style={{width: 180, marginTop: 20}}><UserHomeCard user={record}/></Col>
                })
                :
                <React.Fragment>
                  <Col span={6} style={{ marginTop: 20}}><StyleLoadingCardUser/></Col>
                  <Col span={6} style={{ marginTop: 20}}><StyleLoadingCardUser/></Col>
                  <Col span={6} style={{ marginTop: 20}}><StyleLoadingCardUser/></Col>
                  <Col span={6} style={{ marginTop: 20}}><StyleLoadingCardUser/></Col>
                </React.Fragment>
              }
            </Row> */}

        </Col>
        <Col span={7}>
          <Ranking/>
        </Col>
      </Row>
    </div>
    )
  }
}      


const mapStateToProps = (state) => ({
  appReducer: state.appReducer,
})

const mapDispatchToProps = (dispatch) => ({
  getHomeSongs: ()=>dispatch(getHomeSongs()),
  getHotUsers: ()=>dispatch(getHotUsers()),
  getFindDataList:()=>dispatch(getFindDataList())
})
export default connect(mapStateToProps, mapDispatchToProps)(HomeContent);