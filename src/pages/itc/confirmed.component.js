
import React, { Component } from 'react';

import { none_headersInstance } from '../../configurations/instance';
import { DataGrid, } from '@material-ui/data-grid';
import Preview from '../approval/components/moreDetail.component';

class ITC_Confirmed extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
            preview: false,
        };

        this.getData = this.getData.bind(this);
        this.preview = this.preview.bind(this);
        this.close = this.close.bind(this);
        this.onSelectionModelChange = this.onSelectionModelChange.bind(this);
    }
    componentDidMount() {
        this.getData();
    }

    async getData() {

        try {
            const response = await none_headersInstance().get(`/itc/confirmed`);

            console.log(response)

            this.setState({
                data: response.data.data
            })

        } catch (err) {
            console.log(err.stack);
        }
    }
    onSelectionModelChange(rows) {
        this.setState({
            dataSelected: rows.selectionModel,
        });

    }
    close() {
        this.setState({ preview: false, })
    }
    preview(data) {
        this.setState({ preview: true, rowclick: data.id })
    }
    render() {
        let preview;
        if (this.state.preview === true) {
            preview = <Preview close={this.close} id={this.state.rowclick} />
        }
        const columns = [
            // { field: 'preview', headerName: 'show', width: 80 },
            { field: 'cipNo', headerName: 'CIP No.', width: 120 },
            { field: 'subCipNo', headerName: 'Sub CIP No.', width: 120 },
            { field: 'vendor', headerName: 'Vendor', width: 130 },
            { field: 'name', headerName: 'Name', width: 200, },
            { field: 'qty', headerName: 'Qty.', width: 80 },
            { field: 'totalThb', headerName: 'Total (THB)', width: 130, },
            // { field: 'cc', headerName: 'CC', width: 80 },
        ];
        return (
            
            <center>
                {preview}
                <div style={{ height: 650, width: 'calc(93%)', marginTop: 'calc(1%)' }}>
                    <DataGrid
                        rows={this.state.data}
                        columns={columns}
                        pageSize={20}
                        // checkboxSelection
                        onRowClick={(row) => this.preview(row)}
                        // onRowSelected={(row) => this.selectionRow(row)}
                        onSelectionModelChange={(row) => this.onSelectionModelChange(row)}
                        disableSelectionOnClick={true}
                    />
                </div>
            </center>
        );
    }
}

export default ITC_Confirmed;