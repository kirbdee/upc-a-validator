import React, { Component } from 'react';
import upcValidator from '../lib/upcvalidator';
import UPCPanel from '../app/UPCPanel';
import UPCItem from '../app/UPCItem';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "input": "",
            "upcMap": {},
            "banner": "",
            "isAllValid": false
        };

        this.onChangeHandle = this.onChangeHandle.bind(this);
        this.onClickHandle = this.onClickHandle.bind(this);
    }

    onChangeHandle(event) {
        this.setState({
            "input": event.target.value,
            "banner": ""
        }, () => {
            let upcMap = upcValidator(this.state.input);
            console.log(upcMap);
            this.setState({
                upcMap: upcMap.hashMap,
                isAllValid: upcMap.isAllValid
            });
        });

    }

    onClickHandle(event) {
        console.log("CLICKY");
        if(this.state.isAllValid && this.state.upcMap) {
            //if valid send request
            function onSuccess() {
                this.setState({
                    "input": '',
                    "upcMap": {},
                    "banner": <div className="alert alert-success" role="alert"><strong>Success!</strong> Sent UPC's</div>,
                    "isAllValid": true
                });
            }

            function onError() {
                this.setState({
                    "banner": <div className="alert alert-danger" role="alert"><strong>Error!</strong> Couldn't Send UPC's Try Again</div>,
                });
            }

            var xhr = new XMLHttpRequest();
            xhr.addEventListener("load", onSuccess.bind(this));
            xhr.addEventListener("error", onError.bind(this));
            xhr.addEventListener("abort", onError.bind(this));

            xhr.open("post","https://iwo3uesa6c.execute-api.us-east-1.amazonaws.com/prod/products");
            xhr.send(JSON.stringify({
                "list": Object.keys(this.state.upcMap)
            }))

        } else if (!this.state.upcMap ) {
            this.setState({
                "banner": <div className="alert alert-warning" role="alert">Nothing To Submit!</div>
            });

        } else if (!this.state.isAllValid) {
            this.setState({
                "banner": <div className="alert alert-danger" role="alert"><strong>Error!</strong> Please Fix UPC's</div>
            });
        }
    }

    render() {
        let invalid = [],valid =[];
        let upcs = this.state.upcMap ? Object.keys(this.state.upcMap): [];
        for( let index in upcs ) {
            if(upcs.hasOwnProperty(index)) {
                let upc = upcs[index];
                let item = <UPCItem upcKey={upc} upcObj={this.state.upcMap[upc]}/>;
                if(this.state.upcMap[upc].isValid) {
                    valid.push(item);
                } else {
                    invalid.push(item);
                }
            }
        }


        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">
                                UPC-A Validator
                            </a>
                        </div>
                    </div>
                </nav>
                <div className="container-fluid">
                    <div className="panel">
                        <div className="input-group input-group-lg col-xs-12">
                            <input type="text" className="form-control" onChange={this.onChangeHandle} value={this.state.input}
                                   placeholder="Single or comma separated UPCs" aria-describedby="sizing-addon1"/>
                        </div>
                    </div>
                    {this.state.banner}
                    <UPCPanel valid={false} title="Invalid UPC-A's">{invalid}</UPCPanel>
                    <UPCPanel valid={true} title="Valid UPC-A's">{valid}</UPCPanel>
                    <button type="button" className="upc-submit col-xs-12 btn btn-lg btn-primary" onClick={this.onClickHandle}>Submit</button>
                </div>
            </div>
        );
    }
}

export default App;
