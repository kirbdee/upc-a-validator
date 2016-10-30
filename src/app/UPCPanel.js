import React, { Component } from 'react';

class UPCPanel extends Component {

    render() {
        if(this.props.children.length === 0) return null;

        let classModifier = "";
        if(!this.props.valid) {
            classModifier = "panel-danger";
        } else {
            classModifier = "panel-success";

        }

        return (
            <div  className={"panel " + (classModifier)}>
                <div className="panel-heading">
                    {this.props.title}
                </div>
                <div className="upc panel-body">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default UPCPanel