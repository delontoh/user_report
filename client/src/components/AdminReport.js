/*======================================================================================================================
 * import main libraries
 *====================================================================================================================*/
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table-6';
import FontAwesome from 'react-fontawesome';
import moment from "moment";
import { helpers } from '../helpers/index';
import AdminReportDialog from './AdminReportDialog';
import * as UsersModel from '../models/user';

const style = {
    dangerColor: '#f44336',
    warningColor: '#ff8c00',
    successColor: '#4caf50'
};

const btnStyle = {
    borderStyle: 'none',
    backgroundColor: 'transparent'
};

const promptMessage = {
    approved: 'Approve this report?',
    deleted: 'Are you sure you want to delete this report?'
};

/*======================================================================================================================
 * define react component
 *====================================================================================================================*/
class AdminReport extends React.Component {

    constructor() {
        super();
        this.state = {
            showReportDialog: false,
            dialogContent: '',
            open: false,
        }
    }

    componentDidMount() {
        // fetch all reports given user id
        let dummyData = [
            {
                userId: "1",
                userName: "username1",
                userType: "user",
                reportId: "1",
                reportDate: "2020-05-24 11:01:47.220 +00:00",
                content: "User 1: this is my first report",
                status: "pending",
                createdAt: "2020-05-24 11:01:47.220 +00:00",
                updatedAt: "2020-05-24 11:01:47.220 +00:00"
            },
            {
                userId: "1",
                userName: "username1",
                userType: "user",
                reportId: "2",
                reportDate: "2020-05-24 11:01:47.220 +00:00",
                content: "User 1: this is my second report",
                status: "approved",
                createdAt: "2020-05-24 11:01:47.220 +00:00",
                updatedAt: "2020-05-24 11:20:11.173 +00:00"
            },
            {
                userId: "2",
                userName: "username2",
                userType: "user",
                reportId: "3",
                reportDate: "2020-05-24 11:01:47.220 +00:00",
                content: "User 2: this is my first report",
                status: "deleted",
                createdAt: "2020-05-24 11:01:47.220 +00:00",
                updatedAt: "2020-05-24 11:20:48.790 +00:00"
            },
            {
                userId: "2",
                userName: "username2",
                userType: "user",
                reportId: "4",
                reportDate: "2020-05-24 11:01:47.220 +00:00",
                content: "User 2: this is my second report",
                status: "deleted",
                createdAt: "2020-05-24 11:01:47.220 +00:00",
                updatedAt: "2020-05-24 11:01:47.220 +00:00"
            }
        ]
        this.setState({data: dummyData});
    }

    formatStatusColor(status) {
        switch (status) {
            case 'deleted':
                return <span style={{color: style.dangerColor}}>{helpers.general.prettifyConstant(status)}</span>;
            case 'pending':
                return <span style={{color: style.warningColor}}>{helpers.general.prettifyConstant(status)}</span>;
            case 'approved':
                return <span style={{color: style.successColor}}>{helpers.general.prettifyConstant(status)}</span>;
            default:
        }
    };

    getReportTableColumns() {
        const self = this;
        const tableColumns = [
            {
                Header: 'User Id',
                accessor: 'userId',
                id: 'userId',
                width: 100
            },
            {
                Header: 'Report Id',
                accessor: 'reportId',
                id: 'reportId',
                width: 100
            },
            {
                Header: 'Report Date',
                accessor: '',
                id: 'reportDate',
                width: 150,
                Cell: ({ original }) => {
                    let date = new Date(original.reportDate);
                    let day_raw = date.getDate();
                    let month_raw = date.getMonth() + 1;
                    let day = day_raw < 10 ? '0' + day_raw : '' + day_raw;
                    let month = month_raw < 10 ? '0' + month_raw : '' + month_raw;
                    return `${day}/${month}/${date.getFullYear()}`;
                }
            },
            {
                Header: 'Status',
                accessor: 'status',
                id: 'status',
                width: 100,
                Cell: ({original}) => {
                    return self.formatStatusColor(original.status);
                }
            },
            {
                Header: 'Edit Report',
                accessor: '',
                style: {textAlign: 'center'},
                width: 200,
                filterable: false,
                sortable: false,
                Cell: ({original}) => {
                    let reportInfo = {
                        date: moment.parseZone(original.reportDate).format('DD-MM-YYYY'),
                        userName: original.userName,
                        content: original.content,
                    }
                    return (
                        <button className='fontawesom-btn' style={btnStyle} onClick={() => self.handleEditReport(reportInfo)}>
                            <FontAwesome
                                style={{color: '#0091f4',marginLeft: 9}}
                                disabled={false}
                                name='edit'
                                size='2x'
                            />
                        </button>
                    )
                }
            },
            {
                Header: 'Approve',
                accessor: '',
                style: {textAlign: 'center'},
                width: 200,
                filterable: false,
                sortable: false,
                Cell: ({original}) => {
                    const status = 'approved';
                    return (
                        <button className='fontawesom-btn' style={btnStyle} onClick={() => self.handleUpdateReportStatus(original.reportId, status)}>
                            <FontAwesome
                                style={{color: '#14eb14',marginLeft: 9}}
                                disabled={false}
                                name='thumbs-up'
                                size='2x'
                            />
                        </button>
                    )
                }
            },
            {
                Header: 'Delete Report',
                accessor: '',
                style: {textAlign: 'center'},
                width: 200,
                filterable: false,
                sortable: false,
                Cell: ({original}) => {
                    const status = 'deleted';
                    return (
                        <button className='fontawesom-btn' style={btnStyle} onClick={() => self.handleUpdateReportStatus(original.reportId, status)}>
                            <FontAwesome
                                style={{color: '#f44336', marginLeft: 9}}
                                disabled={false}
                                name='trash'
                                size='2x'
                            />
                        </button>
                    )
                }
            },
            {
                Header: 'Created Date',
                accessor: '',
                id: 'createdAt',
                width: 150,
                Cell: ({ original }) => {
                    let date = new Date(original.createdAt);
                    let day_raw = date.getDate();
                    let month_raw = date.getMonth() + 1;
                    let day = day_raw < 10 ? '0' + day_raw : '' + day_raw;
                    let month = month_raw < 10 ? '0' + month_raw : '' + month_raw;
                    return `${day}/${month}/${date.getFullYear()}`;
                }
            },
            {
                Header: 'Updated Date',
                accessor: '',
                id: 'updatedAt',
                width: 150,
                Cell: ({ original }) => {
                    let date = new Date(original.updatedAt);
                    let day_raw = date.getDate();
                    let month_raw = date.getMonth() + 1;
                    let day = day_raw < 10 ? '0' + day_raw : '' + day_raw;
                    let month = month_raw < 10 ? '0' + month_raw : '' + month_raw;
                    return `${day}/${month}/${date.getFullYear()}`;
                }
            },
        ];

        return tableColumns;
    }

    handleEditReport(reportInfo) {
        this.setState({
            showReportDialog: true,
            open: true,
            dialogContent: reportInfo
        })
    }

    onClose() {
        this.setState({
            showReportDialog: false,
            open: false,
            dialogContent: ''
        })
    }

    // Updates report status
    handleUpdateReportStatus(reportId, status) {
        const messageText = status === 'approved' ? promptMessage.approved : promptMessage.deleted;
        helpers.general.prompt({message: messageText}, function (status) {
            if (status === true) {
                let data = {
                    reportId: reportId,
                    status: status
                }
                UsersModel.updateReportStatus({data}, () => {

                })
            }
        });

    }

    render() {
        let { data, showReportDialog, dialogContent, open } = this.state;
        let noDataText = 'No reports submitted';

        return (
            <div className='row justify-content-center'>
                <h3 className='col-3 text-align-center mt-3 mb-5'>Admin Report Settings</h3>
                <div className='col-10'>
                    <ReactTable
                        loading={false}
                        className="-striped -highlight"
                        defaultPageSize={10}
                        filterable={true}
                        defaultFilterMethod={(filter, row, column) => {
                            const id = filter.pivotId || filter.id
                            return row[id] !== undefined ? (String(row[id]).toLowerCase()).indexOf(filter.value.toLowerCase()) > -1 : true
                        }}
                        data={data}
                        columns={this.getReportTableColumns()}
                        noDataText={noDataText}
                    />
                    {showReportDialog ? <AdminReportDialog content={dialogContent} open={open} onClose={this.onClose.bind(this)}/> : <div></div>
                    }
                </div>
            </div>
        )
    }

}

AdminReport.propTypes = {
};

/**
 * Fetch contents from redux store and bind to props in return value
 * @param {*} state
 */
const mapStateToProps = state => {
    return {}
}

/**
 * Bind redux state modifying actions to props
 */
const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminReport));