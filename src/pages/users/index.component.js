
import React, { Component, forwardRef } from 'react';

import MaterialTable from 'material-table';
import {
    Search, Clear, AddBox, Check, DeleteOutline,
    Edit, ChevronRight, SaveAlt, ChevronLeft,
    ArrowDownward, Remove, ViewColumn, FirstPage, LastPage
} from '@material-ui/icons';
import { none_headersInstance, app_jsonInstance } from '../../configurations/instance';

import ErrorBar from '../../components/errorBar/index.component';

export default class Users extends Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            rowData: [],
            error: false,
            message: '',
        }
        this.rowData = this.rowData.bind(this);
    }
    componentDidMount() {
        this.rowData();
    }

    async rowData() {

        try {
            this.setState({ loading: true })
            const response = await none_headersInstance().get(`/user/manage`);

            this.setState({ rowData: response.data.data, loading: false, })

        } catch (err) {

        }
    }
    async create(data) {
        try {
            const body = {
                empNo: data.empNo,
                permission: data.deptCode,
                action: data.action,
                dept: data.deptName
            }
            await app_jsonInstance().post(`/user/manage/create`, body);
            this.rowData();

        } catch (err) {
            if (err.response.status === 400) {
                this.setState({ error: true, message: err.response.data.message });

                setTimeout(() => {
                    this.setState({ error: false, })
                }, 3000);
            }
        }
    }
    async update(oldData, newData) {
        const body = {
            newEmpNo: newData.empNo,
            oldEmpNo: oldData.empNo,
            oldPremission: oldData.deptCode,
            newPremission: newData.deptCode,
            oldAction: oldData.action,
            newAction: newData.action
        };
        await app_jsonInstance().put(`/user/manage`, body);
        await this.rowData();
    }
    async delete(oldData) {
        try {
            await app_jsonInstance().delete(`/user/manage/${oldData.empNo}`)
            await this.rowData();
        } catch (err) {
            console.log(err.stack);
        }
    }
    render() {
        let error;

        if (this.state.error === true) {
            error = <ErrorBar message={this.state.message} />
        }
        return (
            <>
            {error}
                <MaterialTable
                    title={'Users management'}
                    columns={[
                        { field: 'empNo', title: 'Emp No.', align: 'center', editable: 'always', },
                        { field: 'name', title: 'Name', align: 'center', editable: 'never' },
                        { field: 'deptName', title: 'Dept.', align: 'center', editable: 'onAdd' },
                        { field: 'deptCode', title: 'Dept action', align: 'center', editable: 'always' },
                        {
                            field: 'action', title: 'action', align: 'center', editable: 'always',
                            render: (params) => {
                                // console.log('render: ', params);
                                return <select value={params.action} style={{ padding: '3px', borderRadius: '3px' }}>
                                    <option value="prepare">Prepare</option>
                                    <option value="checker">Check</option>
                                    <option value="approver">Approve</option>
                                </select>
                            },
                            lookup: { prepare: 'Prepare', checker: 'Check', approver: 'Approve' }
                        },
                    ]}
                    icons={{
                        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} color="primary" />),
                        Check: forwardRef((props, ref) => <Check {...props} ref={ref} style={{ color: '#3f51b5' }} />),
                        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
                        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} color="secondary" />),
                        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
                        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} style={{ color: '#4caf50' }} />),
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
                    data={this.state.rowData}
                    isLoading={this.state.loading}
                    localization={{
                        body: {
                            editRow: {
                                deleteText: 'Delete this row?'
                            },
                        }
                    }}
                    options={{
                        pageSize: 10,
                        pageSizeOptions: [10],
                        loadingType: 'linear',
                        rowStyle: { fontSize: '15px' }
                    }}
                    style={{
                        boxShadow: '0px 3px 10px 0px #82d0f3',
                        width: 'calc(100%)',
                        borderRadius: '8px'
                    }}
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    this.create(newData)
                                    resolve();
                                }, 1000)
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    this.update(oldData, newData)
                                    resolve();
                                }, 1000)
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    this.delete(oldData)
                                    resolve();
                                }, 1000);
                            })
                    }}
                />
            </>
        )
    }
}
