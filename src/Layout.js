import React, { Component } from 'react';
import { Layout, Menu, Icon, Avatar, message, notification } from 'antd';
import axios from 'axios';
import Home from './design/Home';
import Members from './design/Member';
import GymProfile from './design/GymProfile';
import Diet from './design/Diet';
import FeeManagment from './design/FeeManagment';
// import PlanManager from './design/PlanManager';
import firebase from 'firebase';
import moment from 'moment';
import WorkoutPlan from './design/WorkoutPlan';
import NoticeManager from './design/NoticeManager';
import { Switch, Link } from "react-router-dom";
import tezzotext from './asset/images/tezzo-text-blue.png';
import tezzologo from './asset/images/tezzo-orange.png';
import pf_logo from './asset/images/pf_logo.png'
import ApiRoutes from './config/ApiRoutes';

const rootref = firebase.database();
const { Content, Footer, Sider } = Layout;

//icons



export default class LayoutMain extends Component {
    state = {
        collapsed: true,
        view: null,
        gymInfo: {}
    };
    componentDidMount() {
        this.setState({
            view: <Home />
        })
        let lc = localStorage.getItem('xdGcsHneGi3r@ywThjref')
        if (lc === null) {
            this.props.history.push('/login');
            message.error('You are not logged in !');
            return;
        }
        axios.post(ApiRoutes.api_route + '/gprofile/get-gym-byid', {
            gymId: lc
        })
            .then(res => {
                console.log(res.data)
                this.setState({
                    gymInfo: res.data.msg
                })
            })
            .catch(err => console.log(err))

        let dt = moment().format('DDMMYYYY');
        let g_name = localStorage.getItem('gym_name');
        let gy = g_name.replace(/\s/g, '');
        rootref.ref().child('Attendance').child(gy).child(dt).endAt().limitToFirst(1).on('child_added', (snap) => {
            notification.success({
                message: 'Attendance Added',
                description: `${snap.val().membership_no} : ${snap.val().name}`
            })

            console.log(snap.val());
        })


    }
    logout = () => {

        localStorage.removeItem('xdGcsHneGi3r@ywThjref')
        message.success('Logged Out !')
        this.props.history.push('/login');
    }
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    getLocation = (data) => {
        console.log(data.key)
        if (data.key === '1') {
            this.setState({
                view: <Home />
            })
        }
        else if (data.key === '2') {
            this.setState({
                view: <Members />
            })
        }
        else if (data.key === '3') {
            this.setState({
                view: <FeeManagment />
            })
        }
        else if (data.key === '4') {
            this.setState({
                view: <GymProfile />
            })
        }
        else if (data.key === '5') {
            this.setState({
                view: <Diet />
            })
        }
        else if (data.key === '6') {
            this.setState({
                view: <WorkoutPlan />
            })
        }
        else if (data.key === '7') {
            this.setState({
                view: <NoticeManager />
            })
        }
    }
    render() {


        return (
            <div>
                <Layout style={{ minHeight: '100vh', }}>
                    <Sider collapsible collapsed={this.state.collapsed} >
                        <div className="logo">
                            <img src={tezzologo}
                                style={{
                                    margin: "20px auto 10px",
                                    height: "45px",

                                }} alt="tezzo-logo" />
                        </div>
                        <Menu onClick={this.getLocation} defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1" >
                                <Icon type="home" />

                                <span>Home</span>
                            </Menu.Item>


                            <Menu.Item key="2">
                                <Icon type="usergroup-add" />
                                <span>Members</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="credit-card" />
                                <span>Fee Managment</span>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="user" />
                                <span>Gym Profile</span>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Icon type="monitor" />
                                <span>Diet Plan</span>
                            </Menu.Item>
                            <Menu.Item key="7">
                                <Icon type="monitor" />
                                <span>Diet Plan</span>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <Icon type="monitor" />
                                <span>Workout Plan Manager</span>
                            </Menu.Item>


                        </Menu>
                    </Sider>
                    <Layout>
                        <Content>
                            <nav className="uk-navbar-container" style={{ background: '#fff' }} uk-navbar="true">

                                <div className="uk-navbar-left">
                                    <ul className="uk-navbar-nav">

                                        <li>
                                            <Link to="#">
                                                <img src={tezzotext}
                                                    style={{
                                                        margin: "0px auto 0px",
                                                        height: "35px",

                                                    }} alt="tezzo-logo" />
                                            </Link>

                                        </li>

                                    </ul>
                                </div>

                                <div className="uk-navbar-right">

                                    <ul className="uk-navbar-nav">

                                        <li>
                                            <Link to="#">

                                                {
                                                    (this.state.gymInfo.logo === "") ?
                                                        <Avatar className="uk-margin-right" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> :
                                                        <Avatar className="uk-margin-right" src={this.state.gymInfo.logo} />

                                                }
                                                {this.state.gymInfo.gym_name}

                                            </Link>
                                            <div className="uk-navbar-dropdown">
                                                <ul className="uk-nav uk-navbar-dropdown-nav">
                                                    <li className="uk-active"><Link to="#" onClick={this.logout}>Logout</Link></li>

                                                </ul>
                                            </div>
                                        </li>

                                    </ul>

                                </div>

                            </nav>
                            <div style={{ padding: 24, background: '#F0F4F7', minHeight: 360 }}>
                                <Switch onChange={this.handleChange}>
                                    {
                                        this.state.view
                                    }
                                </Switch>
                            </div>
                        </Content>
                        <Footer style={{
                            textAlign: 'center',
                            fontSize: '15px',
                            letterSpacing: '1px',
                            color: '#29435d',
                            fontWeight: '600'
                        }}>
                            <img src={pf_logo} alt="pinkfry_logo" style={{ height: '13px', margin: '0 auto', marginBottom: '10px' }} />
    A PINKFRY PRODUCT

                        </Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
} 