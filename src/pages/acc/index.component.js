
import React, { Component } from 'react';

import ApprovalBudget from './approvalBudget.component';
import WaitingFA from './waitingFA.component';
import WaitingGM from './waitingGM.component';

class ACC extends Component {
    render() {
        let element;

        if (this.props.page === 'approvalBudget') {
            element = <ApprovalBudget />
        } else if (this.props.page === 'waitingGM') {
            element = <WaitingGM />
        } else {
            element = <WaitingFA />
        }
        return (
            <>
                {element}
            </>
        );
    }
}

export default ACC;