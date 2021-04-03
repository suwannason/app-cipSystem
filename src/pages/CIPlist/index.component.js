
import React, { Component, forwardRef } from 'react';

import Loading from '../../components/loading/index.component';
import { Clear, Check, FilterList, FirstPage, LastPage, DeleteForever, Edit, Add, SaveAlt, ArrowForwardIos, Search, NavigateNext, ArrowBackIos, SortOutlined } from '@material-ui/icons';

import MatrialTable from 'material-table';

import { Box } from '@material-ui/core';

class CIPlist extends Component {
    render() {
        return (
            <>
                <Loading />

                <Box component="body" style={{ backgroundColor: '#c4eccb', padding: '10px', borderRadius: '10px' }}>
                    <MatrialTable title="CIP list"
                        icons={{
                            Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
                            Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
                            Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
                            FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
                            LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
                            NextPage: forwardRef((props, ref) => <NavigateNext {...props} ref={ref} />),
                            PreviousPage: forwardRef((props, ref) => <ArrowBackIos {...props} ref={ref} />),
                            ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
                            SortArrow: forwardRef((props, ref) => <SortOutlined {...props} ref={ref} />),
                            Delete: forwardRef((props, ref) => <DeleteForever {...props} ref={ref} />),
                            Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
                            Add: forwardRef((props, ref) => <Add {...props} ref={ref} />),
                            Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} style={{ width: '15px', height: '15px' }} />),
                            DetailPanel: forwardRef((props, ref) => <ArrowForwardIos {...props} ref={ref} />),
                            Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} style={{ color: '#192263' }} />),
                        }}
                        columns={
                            [
                                { title: 'CIP No.', field: 'pcName', cellStyle: { padding: '0 14px', width: '220px' }, align: 'center' },
                                // { title: 'Fix Asset', field: 'fixAsset', cellStyle: { padding: '0 14px', } },
                                { title: 'Sub CIP No.', field: 'statusUse', cellStyle: { padding: '0 14px', width: '60px' } },
                                { title: 'Vendor', field: 'hwType', cellStyle: { padding: '0 14px', }, },
                                { title: 'Name', field: 'mainUser', cellStyle: { padding: '0 14px', width: '180px' } },
                                { title: 'Qty.', field: 'name', cellStyle: { padding: '0 14px', width: '140px' }, },
                                { title: 'Total (THB)', field: 'lastName', cellStyle: { padding: '0 14px', width: '140px' }, },
                                { title: 'CC', field: 'dept', cellStyle: { padding: '0 14px', } },

                            ]
                        }
                        options={{
                            pageSize: 12,
                            pageSizeOptions: [12]

                        }} />

                </Box>
            </>
        );
    }
}

export default CIPlist;