import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Button.css';

export class Button extends Component {
    getSize(){
        let acceptableSizes=['huge','large','small'];
        return acceptableSizes.find(size=>this.props.size===size) || '';
    }
    render() {
        let hasPrimary = this.props.primary?"primary":null;
        let hasSuccess = this.props.success?"success":null;
        let hasWarning = this.props.warning?"warning":null;
        let hasError = this.props.error||this.props.danger?"error":null;
        let hasInfo = this.props.info?"info":null;
        let hasBlock = this.props.block?"block":null;
        let hasWide = this.props.wide?"wide":null;

        return (
            <Link to={this.props.to || '/'} onClick={this.props.onClick} disabled={this.props.disabled} className={`button ${this.getSize()} ${hasPrimary} ${hasSuccess} ${hasWarning} ${hasError} ${hasInfo} ${hasBlock} ${hasWide}`}>{this.props.children}</Link>
        )
    }
}