import React from 'react';

import {
    Table,
    Row,
    Col,
    Divider,

} from 'antd'

import {
    NavItem,
    NavLink
} from "shards-react";

import {
    Navigate
} from 'react-router-dom';

import MenuBar from '../components/MenuBar';
import { Form, FormInput, FormGroup, Button } from "shards-react";
import { getRegister } from '../fetcher'


class RegisterPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isRegisterd: false,
            username: '',
            password: '',
            email: ''
        }

        this.registerOnChange = this.registerOnChange.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
    }


    handleUsernameChange(event) {
        this.setState({ username: event.target.value })
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value })
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value })
    }


    renderRedirect = () => {
        if (this.state.isRegistered) {
            return <Navigate to='/' />
        }
    }

    registerOnChange() {
        getRegister(this.state.username, this.state.password, this.state.email).then(res => {
            if (res.isRegistered) {
                this.setState({
                    username: res.results.username,
                    password: res.results.password,
                    email: res.results.email,
                    isRegistered: true
                })
                localStorage.setItem("isLoggedIn", 'true')
            } else {
                res.results.then(val => {
                    alert(val.message)
                })
            }
        })
        localStorage.setItem("username", this.state.username)
    }

    componentDidMount() { }


    render() {
        return (
            <div><MenuBar />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>username</label>
                            <FormInput placeholder="admin" value={this.state.username} onChange={this.handleUsernameChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>password</label>
                            <FormInput placeholder="admin" value={this.state.password} onChange={this.handlePasswordChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>email</label>
                            <FormInput placeholder="bobbyshmurda@gmail.com" value={this.state.email} onChange={this.handleEmailChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            {this.renderRedirect()}
                            <Button style={{ marginTop: '4vh' }} onClick={this.registerOnChange}>Register</Button>
                        </FormGroup></Col>

                    </Row>

                </Form>
                <Divider />
            </div>
        )
    }

}

export default RegisterPage

