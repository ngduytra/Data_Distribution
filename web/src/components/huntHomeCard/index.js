import React from 'react';
import {
    Card,
    Tooltip,
    Typography,
    Avatar
  } from 'antd';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router';
import {set_music_selected} from '../../actions/app'
import { connect} from 'react-redux'

const { Text } = Typography;
const { Meta } = Card;

class HuntCard extends React.Component {
  
  render() {
    const {huntData} = this.props
    return (
      <Tooltip style={{display: 'flex'}} title={huntData.fee +'divs'} placement="top" onClick={() => this.props.history.push(`/martketplaceFindData`)} >
        <Card
            hoverable
            size="small"
            cover={<Avatar alt="music background" size={this.props.songPage ? 160 : 170} src={window.$linkIPFS + huntData.user.avatar}/>}
            bodyStyle={{padding: '10px', textAlign: 'center'}}
            bordered={false}
            style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}
          >
          <Meta 
            title = {<Text style={{fontSize: 15}} type="warning">{huntData.name}</Text>}
            description = {<Text style={{fontSize: 14}} type="secondary">{huntData.user.follow} Follows</Text>}
          />
        </Card>
      </Tooltip>
    );
  }
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  set_music_selected: (musicSelected)=>dispatch(set_music_selected(musicSelected)),
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HuntCard));