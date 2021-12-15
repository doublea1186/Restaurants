import React from 'react';

import {
    Row,
    Col,
    Divider,

} from 'antd'

import {
    NavItem,
    NavLink
  } from "shards-react";

import MenuBar from '../components/MenuBar';
import { Form, FormInput, FormGroup, Button} from "shards-react";

class LogoutPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoggedIn: false,
            username: '',
            password: '',
        }

        this.handleLogout = this.handleLogout.bind(this)
    }


    handleLogout(event) {
        localStorage.setItem("isLoggedIn", 'false');
        localStorage.clear()
    }

    componentDidMount() { }


    render() {
        return (
            <div><MenuBar />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <NavItem><NavLink href="/Login" className="btn btn-primary" onClick={this.handleLogout}>Logout</NavLink></NavItem>
                        </FormGroup></Col>

                    </Row>

                </Form>
                <Divider />
            </div>
        )
    }

}

export default LogoutPage

