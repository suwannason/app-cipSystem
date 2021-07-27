
import React, { Component, forwardRef } from 'react';

import MaterialTable from 'material-table';
import {
    Search, Clear, AddBox, Check, DeleteOutline,
    Edit, ChevronRight, SaveAlt, ChevronLeft,
    ArrowDownward, Remove, ViewColumn, FirstPage, LastPage
} from '@material-ui/icons';

export default class Users extends Component {
    constructor() {
        super();

        this.state = {
            loading: false,
        }
    }
    create(data) {

    }
    update(oldData, newData) {

    }
    delete(oldData) {

    }
    render() {
        return (
            <MaterialTable
                title={'User management'}
                columns={[
                    { field: 'empNo', title: 'Emp No.', align: 'center', editable: 'always' },
                    { field: 'name', title: 'Name', align: 'center', editable: 'onUpdate' },
                    { field: 'deptCode', title: 'Department', align: 'center', editable: 'always' },
                    { field: 'action', title: 'Permission', align: 'center', editable: 'always', },
                ]}
                icons={{
                    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
                    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
                    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
                    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
                    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
                    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
                    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
                    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
                    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
                    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
                    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
                    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
                    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
                    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
                    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
                    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
                }}
                data={[{ empNo: '013817', name: 'Suwannason Sisuk', deptCode: '2230', action: 'prepare' }]}
                isLoading={this.state.loading}
                localization={{
                    body: {
                        editRow: {
                            deleteText: 'Delete this row?'
                        }
                    }
                }}
                options={{
                    pageSize: 10,
                    pageSizeOptions: [10],
                }}
                style={{
                    boxShadow: '0px 3px 10px 0px #82d0f3',
                    width: 'calc(100%)',
                    borderRadius: '8px'
                }}
                editable={{
                    onRowAdd: (newData) => {
                        this.create(newData);
                    },
                    onRowUpdate: (newData, oldData) => {
                        this.update(oldData, newData)
                    },
                    onRowDelete: (oldData) => {
                        this.delete(oldData);
                    }
                }}
            />
        )
    }
}
