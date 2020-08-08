import React, { Component } from 'react'
import { Result, Button } from 'antd';

class Pay extends Component {
    render() {
        return (
            <div>
                <Result
                    status="success"
                    title="pay!"
                    subTitle={`Cuộc khảo sát sẽ tiêu tốn ${this.props.total}`} 
                />
            </div>
        )
    }
}

export default Pay
