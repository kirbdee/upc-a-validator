import React, { Component } from 'react';

class UPCItem extends Component {

    render() {
        let colClass = "col-md-2";
        let panelClass = "panel panel-default";
        let footer = "";
        if(!this.props.upcObj.isValid) {
            colClass = "col-md-3";
            panelClass = "panel panel-danger";
            footer = <div key={this.props.upcKey+footer} className="panel-footer panel-heading">suggestions: { this.props.upcObj.suggestions.length > 0 ? JSON.stringify(this.props.upcObj.suggestions) : "Invalid Format"}</div>;
        }

        return (
            <div className={colClass} key={this.props.upcKey}>
                <div className={panelClass} >
                    <div className="panel-body">
                        {this.props.upcKey}
                    </div>
                    {footer}
                </div>
            </div>
        )
    }
}

export default UPCItem