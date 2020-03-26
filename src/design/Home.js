import React, { Component } from 'react';
import ImgLogo from '../icons/gym.png'

export default class Home extends Component {
    render() {
        return (
            <div>

                <div className="flex w-100 rounded-lg bg-white">
                    <div className="flex-1 bg-white p-10 box-left">
                        <h1 className="cover-head-one">Hi, Buddy</h1>
                        <h3 className="cover-head-two">Welcome to <span className="cover-span">JA</span> Dashboard</h3>
                        <p>Manage Your GYM Seamlessly</p>
                    </div>
                    <div className="flex-1 bg-white p-12 box-right">
                        <img src={ImgLogo} alt="logo" style={{ height: '250px', margin: '0 auto' }} />
                    </div>
                </div>
            </div>
        )
    }
}