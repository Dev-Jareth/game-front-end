import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './SideNavLink.css';

export class SideNavLink extends Component {
    render() {
            
        let icon = this.props.icon?<label className={`side-nav-link-icon pull-right fa fa-${this.props.icon}`}></label>:null;
        return (
            <li>
            <NavLink activeClassName="active" className="side-nav-link" exact={this.props.exact} to={this.props.to || '/'}>
            <span className="side-nav-link-text pull-left">{this.props.children}</span>
            {icon}
                </NavLink>
            </li>
        )
    }
}