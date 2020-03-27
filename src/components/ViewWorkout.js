import React, { Component } from 'react'
import { Table, Divider, Tag } from 'antd';

const { Column } = Table;
export default class ViewWorkout extends Component {
    constructor() {
        super();
        this.state = {
            workout: {}
        }
    }
    componentDidMount() {
        this.setState({
            workout: this.props.workout
        })
    }
    render() {
        return (
            <div>
                <div className="uk-card uk-card-default uk-card-body">
                    <h1 className="page-head">{this.state.workout.plan_name} </h1>

                    <Table dataSource={this.state.workout.workout}>

                        <Column title="Workout Day" dataIndex="workout_day" key="workout_day" />
                        <Column
                            title="Body Part"
                            key="body_part"
                            dataIndex="body_part"
                            render={body_part => (
                                <span>
                                    {body_part.map((tag, index) => (
                                        <Tag key={index}>
                                            {tag}
                                        </Tag>
                                    ))}
                                </span>
                            )}
                        />
                        <Column
                            title="Workout Name"
                            key="workout_name"
                            dataIndex="workout_name"
                            render={workout_name => (
                                <span>
                                    {workout_name.map((tag, index) => (
                                        <Tag key={index}>
                                            {tag}
                                        </Tag>
                                    ))}
                                </span>
                            )}
                        />
                        <Column
                            title="Sets"
                            key="workout_sets"
                            dataIndex="workout_sets"
                            render={workout_sets => (
                                <span>
                                    {workout_sets.map((tag, index) => (
                                        <Tag key={index}>
                                            {tag}
                                        </Tag>
                                    ))}
                                </span>
                            )}
                        />
                        <Column
                            title="Reps"
                            key="workout_reps"
                            dataIndex="workout_reps"
                            render={workout_reps => (
                                <span>
                                    {workout_reps.map((tag, index) => (
                                        <Tag key={index}>
                                            {tag}
                                        </Tag>
                                    ))}
                                </span>
                            )}
                        />
                    </Table>
                </div>

            </div>
        )
    }
}
