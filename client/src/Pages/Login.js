import React from 'react';

import {
    Table,
    Row,
    Col,
    Divider,

} from 'antd'

import {
    Navigate
} from 'react-router-dom';

import MenuBar from '../components/MenuBar';
import { Form, FormInput, FormGroup, Button} from "shards-react";
import { getLogin } from '../fetcher'

class LoginPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoggedIn: false,
            username: '',
            password: '',
        }

        this.loginOnChange = this.loginOnChange.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }


    handleUsernameChange(event) {
        this.setState({ username: event.target.value })
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value })
    }
      
    renderRedirect = () => {
        if (this.state.isLoggedIn) {
            return <Navigate to='/' /> 
        }
    }
    
    loginOnChange() {
        
        getLogin(this.state.username, this.state.password).then(res => {
            console.log(res.isLoggedIn)
            if (res.isLoggedIn) {
                this.setState({
                    username: res.results.username,
                    password: res.results.password,
                    isLoggedIn: true
                })
                localStorage.setItem("isLoggedIn", 'true')
                
                return <Navigate to='/'></Navigate>
            } else {
                localStorage.setItem("isLoggedIn", 'false');
                localStorage.setItem("username", null)
                alert('Username and/or Password incorrect')
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
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            {this.renderRedirect()}
                            <Button style={{ marginTop: '4vh' }} onClick={this.loginOnChange}>Login</Button>
                        </FormGroup></Col>

                    </Row>

                </Form>
                <Divider />
            </div>
        )
    }

}

export default LoginPage

