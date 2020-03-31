import React, { Component } from 'react';
import ImgLogo from '../asset/images/gym.png';
import people from '../asset/images/people.svg';
import diet from '../asset/images/restaurant.svg';
import dumbell from '../asset/images/fit.svg';
import money from '../asset/images/credit-card.svg';

export default class Home extends Component {
    render() {
        return (
            <div>

                <div className="flex w-100 rounded-lg bg-white">
                    <div className="flex-1 bg-white p-10 box-left">
                        <h1 className="cover-head-one">Hello</h1>
                        <h3 className="cover-head-two">Welcome to <span className="cover-span">Tezzo</span> Dashboard</h3>
                        <p
                            style={{
                                fontSize: '18px',
                                letterSpacing: '1px'
                            }}
                        >Effortlessly Manage Your Gym</p>
                    </div>
                    <div className="flex-1 bg-white p-12 box-right">
                        <img src={ImgLogo} alt="logo" style={{ height: '250px', margin: '0 auto' }} />
                    </div>
                </div>
                <br />
                <div class="uk-child-width-expand@s" uk-grid="true">
                    <div>
                        <div>
                            <div className="w-100 rounded-lg bg-white">
                                <div className="flex bg-white p-4 box-left">
                                    <div>
                                        <img src={people} alt="member-logo" />
                                    </div>
                                    <div className="uk-margin-left" style={{ paddingTop: '6px' }}>
                                        <h3 className="cover-head-two" style={{ fontSize: '30px', marginBottom: '0px' }}>250</h3>
                                        <span>Total Members</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>
                                <div className="w-100 rounded-lg bg-white">
                                    <div className="flex bg-white p-4 box-left">
                                                              <div>
                                            <img src={diet} alt="member-logo" />
                                            </div>
                                        <div className="uk-margin-left" style={{ paddingTop: '6px' }}>
                                            <h3 className="cover-head-two" style={{ fontSize: '30px', marginBottom: '0px' }}>15</h3>
                                            <span>Total Diet Plans</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                    <div>
                            <div>
                                <div className="w-100 rounded-lg bg-white">
                                    <div className="flex bg-white p-4 box-left">
                                                              <div>
                                            <img src={dumbell} alt="member-logo" />
                                            </div>
                                        <div className="uk-margin-left" style={{ paddingTop: '6px' }}>
                                            <h3 className="cover-head-two" style={{ fontSize: '30px', marginBottom: '0px' }}>7</h3>
                                            <span>Total Workout Plans</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                    <div>
                            <div>
                                <div className="w-100 rounded-lg bg-white">
                                    <div className="flex bg-white p-4 box-left">
                                                              <div>
                                            <img src={money} alt="member-logo" />
                                            </div>
                                        <div className="uk-margin-left" style={{ paddingTop: '6px' }}>
                                            <h3 className="cover-head-two" style={{ fontSize: '30px', marginBottom: '0px' }}>3</h3>
                                            <span>Due Today</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}