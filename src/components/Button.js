import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Button.css';

export class Button extends Component {
    getSize(){
        if(this.props.size === "large") return "large";
        else return "";
    }
    render() {
        let hasPrimary = this.props.primary?"primary":null;
        let hasSuccess = this.props.success?"success":null;
        let hasWarning = this.props.warning?"warning":null;
        let hasError = this.props.error||this.props.danger?"error":null;
        let hasInfo = this.props.info?"info":null;
        let hasBlock = this.props.block?"block":null;

        return (
            <Link to={this.props.to || '/'} onClick={this.props.onClick} className={`button ${this.getSize()} ${hasPrimary} ${hasSuccess} ${hasWarning} ${hasError} ${hasInfo} ${hasBlock} `}>{this.props.children}</Link>
        )
    }
}