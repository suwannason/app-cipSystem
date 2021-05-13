
import React, { Component } from 'react';
import { DataGrid, } from '@material-ui/data-grid';

import DatePicked from '../../components/datepickerRange/index.component';

class ITC_Confirmed extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
            datePicker: false,
        };
        this.dateSelected = this.dateSelected.bind(this);
    }
    dateSelected(body) {

    }
    render() {
        let datePicker;

        if (this.state.datePicker === true) {
            datePicker = <DatePicked callBackClose={this.dateSelected} />
        }
        const columns = [
            // { field: 'preview', headerName: 'show', width: 80 },
            { field: 'cipNo', headerName: 'CIP No.', width: 120 },
            { field: 'subCipNo', headerName: 'Sub CIP No.', width: 120 },
            { field: 'vendor', headerName: 'Vendor', width: 130 },
            { field: 'name', headerName: 'Name', width: 200, },
            { field: 'qty', headerName: 'Qty.', width: 80 },
            { field: 'totalThb', headerName: 'Total (THB)', width: 130, },
            { field: 'status', headerName: 'status.', width: 120 },
            // { field: 'cc', headerName: 'CC', width: 80 },
        ];
        return (
            <div style={{ height: 600, width: 'calc(100%)', marginTop: 'calc(1%)' }}>
                {datePicker}
                <DataGrid
                    rows={this.state.data}
                    columns={columns}
                    pageSize={10}
                    checkboxSelection={false}
                    onRowClick={(row) => this.preview(row)}
                    // onRowSelected={(row) => this.selectionRow(row)}
                    // onSelectionModelChange={(row) => this.onSelectionModelChange(row)}
                    disableSelectionOnClick={true}
                />
            </div>
        );
    }
}

export default ITC_Confirmed;