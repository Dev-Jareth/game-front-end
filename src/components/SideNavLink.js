import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './SideNavLink.css';

export class SideNavLink extends Component {
    render() {
        let isActive = this.props.active
            ? "active"
            : null;
            
        let icon = this.props.icon?<label className={`side-nav-link-icon pull-right fa fa-${this.props.icon}`}></label>:null;
        return (
            <li>
            <Link className={`side-nav-link ${isActive}`} to={this.props.to || '/'}>
            <span className="side-nav-link-text pull-left">{this.props.children}</span>
            {icon}
                </Link>
            </li>
        )
    }
}