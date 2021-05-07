
import React, { Component } from 'react';
import Approval from './approve/index.component';
import Cancellation from './cancel/index.component';

class Approval_index extends Component {
    constructor() {
        super();

        this.state = {
            element: null
        };
    }
    componentDidMount() {
        const tmp = {};
        if (this.props.page === 'cancellation') {
            tmp.element = <Approval page={this.props.page} />
        } else {
            tmp.element = <Cancellation />
        }

        this.setState(tmp);
    }
    render() {

        return (
            <>
                {this.state.element}
            </>
        );
    }
}

export default Approval_index;