import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Anchor.css';

export class Anchor extends Component {
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

        return (
            <Link onClick={this.props.onClick} to={this.props.to ||"/"} disabled={this.props.disabled} className={`anchor ${this.getSize()} ${hasPrimary} ${hasSuccess} ${hasWarning} ${hasError} ${hasInfo} `}>{this.props.children}</Link>
        )
    }
}