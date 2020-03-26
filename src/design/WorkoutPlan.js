import React, { Component } from 'react';
import { Button } from 'antd';
import Chef from '../icons/chef.png';
import { Table, Divider, Tag } from 'antd';
import ManageWorkout from '../components/ManageWorkout';
import ViewWorkout from '../components/ViewWorkout';
import { Link } from 'react-router-dom';
import axios from 'axios';


const { Column } = Table;

export default class WorkoutPlan extends Component {
    constructor() {
        super();
        this.state = {
            view: null,
            dietArray: [
                {
                    id: 'ahxshjxhkjxs',
                    diet_name: 'Beginners Diet'
                }
            ],
            tableLoading: false
        }
    }
    componentDidMount() {
        this.fetchWorkout();
    }
    fetchWorkout = () => {
        this.setState({
            tableLoading: true
        })
        axios.post('http://localhost:5000/workout/all-workout', {
            gym_id: 'monkey-fitness'
        })
            .then(res => {
                console.log(res.data);
                this.setState({
                    dietArray: res.data,
                    tableLoading: false
                })
            })
    }
    handleView = (e, id) => {
        if (e === 1) {
            console.log(e, id)
            this.setState({
                view: <ManageWorkout updateDiet={this.fetchWorkout} />
            })
        } else if (e === 2) {
            console.log(e, id)
            this.setState({
                view: <ViewWorkout />
            })
        }

    }
    render() {
        return (
            <div>
                <div className="flex">
                    <h1 className="page-head">Workout Plan Manager</h1>
                    <img src={Chef} alt="diet-logo" className="ml-4 mt-6" style={{ height: '50px' }} />
                </div>
                <div uk-grid="true">

                    <div class="uk-width-1-3@m">
                        <div class="uk-card uk-card-default uk-card-body">

                            <h3 className="set-heading">Create Workout Plan</h3>
                            <Button className="gen-btn mt-2" onClick={() => this.handleView(1, null)}>Add Diet</Button>
                            <Table loading={this.state.tableLoading} dataSource={this.state.dietArray}>

                                <Column title="Diet Name" dataIndex="diet_name" key="diet_name" />

                                <Column
                                    title="Action"
                                    key="action"
                                    render={(text, record) => (
                                        <span>

                                            <Divider type="vertical" />
                                            <Link to="#" onClick={() => this.handleView(2, 'id')}>View</Link>
                                        </span>
                                    )}
                                />
                            </Table>
                        </div>
                    </div>
                    <div class="uk-width-expand@m">
                        {
                            this.state.view
                        }
                    </div>
                </div>
            </div>
        )
    }
}
