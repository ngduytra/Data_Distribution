import 'antd/dist/antd.css';
import './footer.css'
import { Row, Col,Icon } from 'antd';
import React from 'react';
import logo from '../../images/logo.png'

export default class Footer extends React.Component {
	render () {
		return(
			<div className="wrapper">
				<div className="footerdiv">
					<div className='footercontent'>
					<Row gutter={8}>
						<Col className="gutter-row" span={8}>
							<img src={logo} className="footerlogo" alt='Data Distribution'/>
							<h2>Data Distribution</h2>
						</Col>
						<Col className="gutter-row" span={8}>
							<div className="footermiddlecol">
							<p> <Icon type="environment" /> Divergent Valley, Viet Nam
							</p>
							<p> <Icon type="mobile" /> 0337597788</p>
							<p> © 2020 Data Distribution All Rights Reserverd</p>
							</div>
						</Col>
						<Col className="gutter-row" span={8}>
							<h2> About The Company</h2>
							<p></p>
							<p> We offer many solutions to protect and monetize from your data.  </p>
						</Col>
					</Row>
					</div>
				</div>
			</div>
    	)
   }
}
