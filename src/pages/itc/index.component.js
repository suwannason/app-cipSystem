
import React, { Component } from 'react';

import Waiting from './waiting.component';
import Confirmed from './confirmed.component';

class ITCApproval extends Component {
    render() {
        let element;

        if (this.props.page === 'confirmed') {
            element = <Confirmed />
        } else {
            element = <Waiting />
        }
        return (
            <>
                {element}
            </>
        );
    }
}

export default ITCApproval;