import React, {Component} from 'react';
import './Login.css';
import {Anchor, Button, Input} from '../../components'
import {push} from 'react-router-redux';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            successTo:"/",
            errOverride:false
        };
    }
    componentWillUpdate(nextProps){
        if(nextProps.goodLogin) this.props.dispatch(push('/'));
    }
    handleLoginRequest(e) {
        this.props.login(this.state.username,this.state.password);
        this.setState({errOverride:false});
        e?e.preventDefault():void(0);
    }
    isErr=()=>this.props.badLogin & !this.state.errOverride;
    removeErr=()=>this.setState({errOverride:true});
    handleEnterKey(key){
        if(key === "Enter")
        this.handleLoginRequest();
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
                    error={this.isErr()}
                    icon="user"
                    onKeyPress = {this.handleEnterKey.bind(this)}
                    onUpdate={username => {this.setState({username});this.removeErr();}}>{this.state.username}</Input>
                <Input
                    placeholder="Password"
                    error={this.isErr()}
                    type="password"
                    icon="lock"
                    onKeyPress = {this.handleEnterKey.bind(this)}
                    onUpdate={password => {this.setState({password});this.removeErr();}}>{this.state.password}</Input>
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