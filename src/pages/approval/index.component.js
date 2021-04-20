
import React, { Component } from 'react';
import Approval from './approve/index.component';
import Cancellation from './cancel/index.component';

class Approval_index extends Component {
    render() {

        let element;

        if (this.props.page === 'approval') {
            element = <Approval />
        } else {
            element = <Cancellation />
        }
        return (
            <>
                {element}
            </>
        );
    }
}

export default Approval_index;