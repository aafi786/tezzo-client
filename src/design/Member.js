import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Divider, Tag, Button, Modal, Input, Radio, notification, Select } from 'antd';
import { Drawer } from 'antd';
import Mem from '../icons/membership.png';
import { PageHeader } from 'antd';
import axios from 'axios';
import { DatePicker, Popconfirm } from 'antd';

const { Column } = Table;
const { Option } = Select;
const InputGroup = Input.Group;

export default class Members extends Component {
    constructor() {
        super();
        this.state = {
            arr: [],
            visible: false,
            visibleDrawer: false,
            membership_no: '',
            email: '',
            f_name: '',
            l_name: '',
            height: '',
            weight: '',
            disease: '',
            dob: '',
            doj: '',
            gender: '',
            age: 0,
            mobile_no: '',
            memberData: [],
            filterType: 'name',
            temp: [],
            id: null,
            loadingTable: false

        }
    }

    componentDidMount() {
        this.fetchAllMem();
    }
    fetchAllMem = () => {
        let lc = localStorage.getItem('xdGcsHneGi3r@ywThjref')
        this.setState({
            loadingTable: true
        })
        axios.post('http://localhost:5000/member/all-members', {
            gymId: lc
        })
            .then(res => {
                this.setState({
                    memberData: res.data,
                    temp: res.data,
                    loadingTable: false
                })
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    showModal = () => {
        this.setState({
            visible: true
        });
    };
    showDrawer = (e) => {
        axios.post('http://localhost:5000/member/getmemberbyid', {
            id: e
        })
            .then(res => {
                const { membership_no, age, firstname, lastname, gender, height, weight, disease, dob, doj, email, address, mobile_no, _id } = res.data.msg;
                this.setState({
                    membership_no,
                    age,
                    height,
                    weight,
                    disease,
                    doj,
                    dob,
                    email,
                    address,
                    gender,
                    f_name: firstname,
                    l_name: lastname,
                    mobile_no,
                    id: _id
                })
                console.log(res.data)
            })
            .catch(err => console.log(err))
        this.setState({
            visibleDrawer: true,
        });
    };

    onClose = () => {
        this.setState({
            visibleDrawer: false,
        });
    };
    onChangeText = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    onChangeGender = (e) => {
        this.setState({
            gender: e.target.value
        })
        console.log(`radio checked:${e.target.value}`);
    }
    onChangeDOB = (date, dateString) => {
        this.setState({
            dob: dateString
        })
        console.log(date, dateString);
    }
    onChangeDOJ = (date, dateString) => {
        this.setState({
            doj: dateString
        })
        console.log(date, dateString);
    }
    addMember = () => {
        let lc = localStorage.getItem('xdGcsHneGi3r@ywThjref');
        this.setState({
            loadingAddMember: true,
            loadingTable: true
        })
        const { membership_no, age, f_name, l_name, gender, height, weight, disease, dob, doj, email, address, mobile_no } = this.state;
        axios.post('http://localhost:5000/member/addmember', {
            membership_no,
            f_name,
            l_name,
            gender,
            height,
            weight,
            disease,
            dob,
            doj,
            email,
            address,
            age,
            mobile_no,
            gymId: lc

        })
            .then(res => {
                if (res.data.sucsess) {
                    this.setState({
                        visible: false,
                        membership_no: '',
                        email: '',
                        f_name: '',
                        l_name: '',
                        height: '',
                        weight: '',
                        disease: '',
                        dob: '',
                        doj: '',
                        gender: '',
                        age: 0,
                        mobile_no: '',
                        loadingTable: false
                    })
                    this.fetchAllMem();
                    notification.success({
                        message: `Member Added Succesfully !`,
                        description:
                            'Member Added Succesfully, Click on view profile to check',
                        placement: 'bottomRight'
                    })
                    this.setState({
                        loadingAddMember: false
                    })


                }
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
    delUser = (e) => {
        this.setState({
            loadingTable: true
        })

        console.log(e);
        axios.post('http://localhost:5000/member/deletememberbyid', {
            id: e._id
        })
            .then(res => {
                console.log(res.data);
                notification.success({
                    message: `Member Deleted Succesfully !`,
                    placement: 'bottomRight'
                })
                this.fetchAllMem();

            })
    }
    handleFilter = value => {
        this.setState({
            filterType: value
        })

    }
    onChangeSelect = (value) => {
        axios.post('http://localhost:5000/member/getmemberbyid', {
            id: value
        })
            .then(res => {
                var tempArray = [];
                tempArray.push(res.data.msg)
                this.setState({
                    memberData: tempArray
                })
            })
        console.log(`selected ${value}`);
    }


    onSearchSelect = (val) => {
        axios.post('http://localhost:5000/member/getmemberbyid', {
            id: val
        })
            .then(res => {
                this.setState({
                    memberData: res.data.msg
                })
            })

    }
    onBlur = () => {
        this.setState({
            memberData: this.state.temp
        })
    }
    updateMember = () => {
        this.setState({
            loadingUpdateMember: true
        })
        const { membership_no, age, f_name, l_name, gender, height, weight, disease, dob, doj, email, address, mobile_no } = this.state;
        axios.post('http://localhost:5000/member/update-member', {
            id: this.state.id,
            membership_no,
            firstname: f_name,
            lastname: l_name,
            gender,
            height,
            weight,
            disease,
            dob,
            doj,
            email,
            address,
            age,
            mobile_no
        })
            .then(res => {
                console.log(res.data);

                this.setState({
                    loadingUpdateMember: false
                });
                notification.success({
                    message: `Member Updated Succesfully !`,
                    placement: 'bottomRight'
                });
                this.fetchAllMem();
            })
            .catch(err => console.log(err))
    }
    cancel = () => {
        console.log('cancel');
    }

    render() {
        return (
            <div>
                <Modal
                    title="Add Member"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    width={700}
                >
                    <div className="pl-4 pr-4">
                        <div className="flex">
                            <div className="flex-1">
                                <label className="label-title">Membership No.</label>
                                <Input placeholder="Email" id="membership_no" onChange={this.onChangeText} value={this.state.membership_no} />
                            </div>
                            <div className="flex-1 uk-margin-left">
                                <label className="label-title">Email</label>
                                <Input placeholder="First Name" id="email" onChange={this.onChangeText} value={this.state.email} />
                            </div>
                        </div>
                        <div className="flex mt-4">
                            <div className="flex-1">
                                <label className="label-title">First Name</label>
                                <Input placeholder="First Name" id="f_name" onChange={this.onChangeText} value={this.state.f_name} />
                            </div>
                            <div className="flex-1 uk-margin-left">
                                <label className="label-title">Last Name</label>
                                <Input placeholder="Last Name" id="l_name" onChange={this.onChangeText} value={this.state.l_name} />
                            </div>
                            <div className="flex-1 uk-margin-left">
                                <label className="label-title">Gender</label>
                                <Radio.Group onChange={this.onChangeGender} defaultValue="">
                                    <Radio.Button value="male">Male</Radio.Button>
                                    <Radio.Button value="female">Female</Radio.Button>

                                </Radio.Group>
                            </div>

                        </div>
                        <div className="flex mt-4">
                            <div className="flex-1">
                                <label className="label-title">Address</label>
                                <Input placeholder="Address" id="address" onChange={this.onChangeText} value={this.state.address} />
                            </div>
                            <div className="flex-2 uk-margin-left">
                                <label className="label-title">Mobile No</label>
                                <Input placeholder="Mobile No" id="mobile_no" onChange={this.onChangeText} value={this.state.mobile_no} />
                            </div>


                        </div>
                        <div className="flex mt-4">
                            <div className="flex-1">
                                <label className="label-title">Height</label>
                                <Input placeholder="Height" id="height" onChange={this.onChangeText} value={this.state.height} />
                            </div>
                            <div className="flex-1 uk-margin-left">
                                <label className="label-title">Weight</label>
                                <Input placeholder="Weight" id="weight" onChange={this.onChangeText} value={this.state.weight} />
                            </div>
                            <div className="flex-1 uk-margin-left">
                                <label className="label-title">Disease</label>
                                <Input placeholder="If Any" id="disease" onChange={this.onChangeText} value={this.state.disease} />
                            </div>

                        </div>
                        <div className="flex mt-4">
                            <div className="flex-1">
                                <label className="label-title">Date of Birth</label>
                                <br />

                                <DatePicker format="DD-MM-YYYY" onChange={this.onChangeDOB} />
                            </div>
                            <div className="flex-1 uk-margin-left">
                                <label className="label-title">Date of Joining</label>
                                <br />
                                <DatePicker format="DD-MM-YYYY" onChange={this.onChangeDOJ} />
                            </div>

                        </div>
                        <Button className="gen-btn mt-4" onClick={this.addMember}>Add Member</Button>

                    </div>
                </Modal>
                <Drawer
                    title="Basic Drawer"
                    placement="bottom"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visibleDrawer}
                    height={500}

                >
                    <PageHeader
                        title={`${this.state.f_name} ${this.state.l_name}`}
                        style={{
                            border: '1px solid rgb(235, 237, 240)',
                        }}
                        subTitle="Gain Weight"
                        tags={<Tag color="green">Paid</Tag>}
                        extra={[
                            <Button key="3" onClick={this.updateMember} loading={this.state.loadingUpdateMember} >Save Changes</Button>,
                            <Button className="gen-btn-red" key="1" type="primary">
                                Delete
      </Button>,

                        ]}
                        avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}

                    >
                        <div className="pl-20 pr-20">
                            <div className="flex">
                                <div className="flex-1">
                                    <label className="label-title">Membership No.</label>
                                    <Input placeholder="Email" id="membership_no" onChange={this.onChangeText} disabled={true} value={this.state.membership_no} />
                                </div>
                                <div className="flex-1 uk-margin-left">
                                    <label className="label-title">Email</label>
                                    <Input placeholder="First Name" id="email" onChange={this.onChangeText} value={this.state.email} />
                                </div>
                            </div>
                            <div className="flex mt-4">
                                <div className="flex-1">
                                    <label className="label-title">First Name</label>
                                    <Input placeholder="First Name" id="f_name" onChange={this.onChangeText} value={this.state.f_name} />
                                </div>
                                <div className="flex-1 uk-margin-left">
                                    <label className="label-title">Last Name</label>
                                    <Input placeholder="Last Name" id="l_name" onChange={this.onChangeText} value={this.state.l_name} />
                                </div>
                                <div className="flex-1 uk-margin-left">
                                    <label className="label-title">Gender</label>
                                    <Radio.Group onChange={this.onChangeGender} defaultValue={this.state.gender}>
                                        <Radio.Button value="male">Male</Radio.Button>
                                        <Radio.Button value="female">Female</Radio.Button>

                                    </Radio.Group>
                                </div>

                            </div>
                            <div className="flex mt-4">
                                <div className="flex-1">
                                    <label className="label-title">Address</label>
                                    <Input placeholder="Address" id="address" onChange={this.onChangeText} value={this.state.address} />
                                </div>
                                <div className="flex-2 uk-margin-left">
                                    <label className="label-title">Mobile No</label>
                                    <Input placeholder="Mobile No" id="mobile_no" onChange={this.onChangeText} value={this.state.mobile_no} />
                                </div>


                            </div>
                            <div className="flex mt-4">
                                <div className="flex-1">
                                    <label className="label-title">Height</label>
                                    <Input placeholder="Height" id="height" onChange={this.onChangeText} value={this.state.height} />
                                </div>
                                <div className="flex-1 uk-margin-left">
                                    <label className="label-title">Weight</label>
                                    <Input placeholder="Weight" id="weight" onChange={this.onChangeText} value={this.state.weight} />
                                </div>
                                <div className="flex-1 uk-margin-left">
                                    <label className="label-title">Disease</label>
                                    <Input placeholder="If Any" id="disease" onChange={this.onChangeText} value={this.state.disease} />
                                </div>

                            </div>
                            <div className="flex mt-4">
                                <div className="flex-1">
                                    <label className="label-title">Date of Birth</label>
                                    <br />

                                    <DatePicker format="DD-MM-YYYY" placeholder={this.state.dob} onChange={this.onChangeDOB} />
                                </div>
                                <div className="flex-1 uk-margin-left">
                                    <label className="label-title">Date of Joining</label>
                                    <br />
                                    <label className="label-title">{this.state.doj}</label>

                                </div>

                            </div>
                        </div>

                    </PageHeader>
                </Drawer>
                <div className="flex">
                    <h1 className="page-head">Members</h1>
                    <img src={Mem} alt="diet-logo" className="ml-4 mt-6" style={{ height: '50px' }} />
                </div>

                <nav className="uk-navbar-container" uk-navbar="true" style={{ background: '#fff' }}>

                    <div className="uk-navbar-left">

                        <ul className="uk-navbar-nav mr-left">
                            <li className="uk-active"><Link to="#">
                                Members Table
                            </Link></li>
                            <li>
                                <Link to="#">
                                    <InputGroup compact>
                                        <Select defaultValue="name" onChange={this.handleFilter}>
                                            <Option value="name">Name</Option>
                                            <Option value="no">Membership No</Option>
                                        </Select>
                                        <Select
                                            showSearch
                                            style={{ width: 200 }}
                                            placeholder="Select a person"
                                            optionFilterProp="children"
                                            onChange={this.onChangeSelect}

                                            onSearch={this.onSearchSelect}
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {
                                                (this.state.filterType === 'name') ?
                                                    this.state.temp.map((data, index) => (
                                                        <Option value={data._id} key={index} >{`${data.firstname}${data.lastname}`}</Option>
                                                    ))
                                                    : this.state.temp.map((data, index) => (
                                                        <Option value={data._id} key={index} >{data.membership_no}</Option>
                                                    ))
                                            }


                                        </Select>
                                    </InputGroup>
                                </Link>
                            </li>
                            <li><Link to="#"> <Button className="gen-btn" onClick={this.onBlur}>Reset</Button></Link></li>
                        </ul>

                    </div>

                    <div className="uk-navbar-right">

                        <ul className="uk-navbar-nav mr-right">

                            <li><Link to="#">
                                <Button className="gen-btn" loading={this.state.loadingAddMember} onClick={this.showModal}>Add Member</Button>
                            </Link></li>
                        </ul>

                    </div>

                </nav>
                <Table dataSource={this.state.memberData} loading={this.state.loadingTable} >

                    <Column title="Membership No." dataIndex="membership_no" key="membership_no" />
                    <Column title="Name" dataIndex="firstname" key="firstname" />
                    <Column title="Mobile No" dataIndex="mobile_no" key="mobile_no" />
                    <Column title="Joining Date" dataIndex="doj" key="doj" />
                    <Column
                        title="Action"
                        key="_id"
                        render={(_id, record) => (
                            <span>
                                <Link to="#" onClick={() => this.showDrawer(_id)}>View Profile {record.lastName}</Link>
                                <Divider type="vertical" />
                                <Popconfirm
                                    title="Are you sure delete this member?"
                                    onConfirm={() => this.delUser(_id)}
                                    onCancel={this.cancel}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Link to="#" >Delete</Link>

                                </Popconfirm>
                            </span>
                        )}
                    />
                </Table>
            </div>
        )
    }
}