import React, {Component} from 'react';
import './Login.css';
import {Anchor, Button, Input} from './components'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: false,
            successTo:"/"
        };
    }
    handleLoginRequest(e) {
        if (this.state.username === "Username" && this.state.password === "password") {
            this.props.login(this.state.username);
            e?void(0):this.props.history.push(this.state.successTo);
        } else {
            e?e.preventDefault() : void(0);
            this.setState({error: true,username:'',password:''});
        }
    }
    handleEnterKey(key){
        if(key === "Enter")
        this.handleLoginRequest();
    }
    removeErr(){
        this.setState({error:false});
    }
    render() {
        return (
            <div className="login-form">
                <span className="clearfix">
                    <span className="pull-right">
                        <Anchor size="small" to="/register">Create Account</Anchor>
                    </span>
                </span>
                <Input
                    placeholder="Username"
                    error={this.state.error}
                    icon="user"
                    onKeyPress = {this.handleEnterKey.bind(this)}
                    onUpdate={username => {this.setState({username});this.removeErr()}}>{this.state.username}</Input>
                <Input
                    placeholder="Password"
                    error={this.state.error}
                    type="password"
                    icon="lock"
                    onKeyPress = {this.handleEnterKey.bind(this)}
                    onUpdate={password => {this.setState({password});this.removeErr()}}>{this.state.password}</Input>
                <Button
                    to={this.state.successTo}
                    size="large"
                    block
                    primary
                    onClick={this
                    .handleLoginRequest
                    .bind(this)}>Login</Button>
                <div style={{
                    padding: "15px"
                }}>
                    <Anchor size="small">Forgotten Password?</Anchor>
                </div>
            </div>
        )
    }
}