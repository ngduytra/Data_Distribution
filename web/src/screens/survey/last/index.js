import React, { Component } from 'react'
import { Result, Icon, Button } from 'antd';

export class Last extends Component {
    render() {
        return (
            <div>
                <Result
                    icon={<Icon type="smile" theme="twoTone" />}
                    title="Great, we have done all the operations!"
                />
            </div>
        )
    }
}

export default Last
