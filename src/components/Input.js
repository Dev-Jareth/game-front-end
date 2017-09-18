import React, {Component} from 'react';
import './Input.css';

export class Input extends Component {
    handleChange(e) {
        if( typeof this.props.onUpdate === 'function')
        this.props.onUpdate(e.target.value);
        else
        console.err("Input Err: No onUpdate defined");
    }
    determineInputType(){
        if(this.props.type==="password") return "password";
        else return "text";
    }
    render() {
        let icon = this.props.icon?<label className={`input-icon fa fa-${this.props.icon}`} htmlFor="login-name"></label>:null;
        let hasError = this.props.error?"error":null;
        let hasSuccess = this.props.success?"success":null;
        let hasDisabled = this.props.disabled?"disabled":null;
        let type = this.determineInputType();
        
        return (
            <div className="input-group">
                <input
                    className={`input-control ${hasError} ${hasSuccess} ${hasDisabled}`}
                    value={this.props.value||this.props.children||""}
                    placeholder={this.props.placeholder}
                    onChange={this
                    .handleChange
                    .bind(this)}
                    disabled={this.props.disabled}
                    readOnly={this.props.readOnly}
                    maxLength={this.props.maxLength}
                    autoFocus={this.props.autoFocus}
                    required={this.props.required}
                    type={type}

                    id="login-name"/>
                {icon}
            </div>
        )
    }
}