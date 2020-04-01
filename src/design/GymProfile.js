import React, { Component } from 'react';
import { Tabs } from 'antd';
import Profile from '../components/Profile';
const { TabPane } = Tabs;

export default class GymProfile extends Component {
    componentDidMount() {
        document.title = "Tezzo - Gym Profile"
    }
    render() {
        return (
            <div>
                <h1 className="page-head">Profile</h1>
                <Tabs defaultActiveKey="1" tabPosition="left" style={{ minHeight: 220 }}>

                    <TabPane tab="Account" key="1">
                        <Profile />
                    </TabPane>
                    <TabPane tab="Payment" key="2">
                        Content of tab 2
            </TabPane>

                </Tabs>
            </div>
        )
    }
}