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
import { setUser } from '../actions/user';
import AdminReportDialog from './AdminReportDialog';
import * as AdminModel from '../models/admin';
import RaisedButton from "material-ui/RaisedButton";

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

const logoutStyle = {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    height: 40,
    justifyContent: 'end'
}
const buttonStyle = {
    borderRadius: 20,
    height: 40,
    lineHeight: '38px'
};
const labelStyle = {
    textTransform: 'captialize',
    fontSize: 14
};

/*======================================================================================================================
 * define react component
 *====================================================================================================================*/
class AdminReportTable extends React.Component {

    constructor() {
        super();
        this.state = {
            showReportDialog: false,
            dialogContent: '',
            open: false,
            data: []
        };
    }

    componentDidMount() {
        let { currentUser, history } = this.props;

        if(!currentUser) {
            history.push('/login');
        } else {
            // Redirects user to report page if userType is user
            if(currentUser.userType && currentUser.userType === 'user') {
                history.push('/report');
            } else {
                // Fetch all users reports by admin userId
                this.fetchAllUsersReport(currentUser);
            }
        }
    }

    fetchAllUsersReport(currentUser) {
        // Fetch all users data with admin userId
        let userId = currentUser.userId;
        let query = {
            userId: userId
        };
        AdminModel.adminGetAllReports(query, (response) => {
            if(response && response.users) {
                this.setState({data: response.users});
            }
        })
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
                Header: 'Username',
                accessor: 'userName',
                id: 'userName',
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
                style: {textAlign: 'center'},
                Cell: ({ original }) => {
                    let str = original.reportDate;
                    let date = moment.parseZone(str).format('DD/MM/YYYY');
                    return `${date}`;
                }
            },
            {
                Header: 'Status',
                accessor: 'status',
                id: 'status',
                width: 100,
                style: {textAlign: 'center'},
                Cell: ({original}) => {
                    return self.formatStatusColor(original.status);
                }
            },
            {
                Header: 'Edit Report',
                accessor: '',
                style: {textAlign: 'center'},
                width: 150,
                filterable: false,
                sortable: false,
                Cell: ({original}) => {
                    let reportInfo = {
                        reportId: original.reportId,
                        date: moment.parseZone(original.reportDate).format('YYYY-MM-DD'),
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
                width: 150,
                filterable: false,
                sortable: false,
                Cell: ({original}) => {
                    const status = 'approved';
                    let isDisabled = original.status === 'deleted' ? true : false;
                    let color = isDisabled ? 'grey' : '#14eb14';
                    return (
                        <button className='fontawesom-btn' style={btnStyle}
                                onClick={() => self.handleUpdateReportStatus(original.reportId, status)}
                                disabled={isDisabled}>
                            <FontAwesome
                                style={{color: color,marginLeft: 9}}
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
                width: 150,
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
                Header: 'Created Date/Time',
                accessor: '',
                id: 'createdAt',
                width: 150,
                style: {textAlign: 'center'},
                Cell: ({ original }) => {
                    let str = original.createdAt;
                    let dateTime = moment.parseZone(str).format('DD/MM/YYYY HH:mm:ss a');
                    return `${dateTime}`;
                }
            },
            {
                Header: 'Updated Date/Time',
                accessor: '',
                id: 'updatedAt',
                width: 150,
                style: {textAlign: 'center'},
                Cell: ({ original }) => {
                    let str = original.updatedAt;
                    let dateTime = moment.parseZone(str).format('DD/MM/YYYY HH:mm:ss a');
                    return `${dateTime}`;
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
    handleUpdateReportStatus(reportId, reportStatus) {
        const self = this;
        let {currentUser} = self.props;
        const messageText = reportStatus === 'approved' ? promptMessage.approved : promptMessage.deleted;
        helpers.general.prompt({message: messageText}, function (status) {
            if (status === true) {
                let data = {
                    reportId: reportId,
                    status: reportStatus
                }
                AdminModel.updateReportStatus(data, (response) => {
                    if(response && response.status) {
                        // Refetch all users data
                        self.fetchAllUsersReport(currentUser);
                    }
                })
            }
        });
    }

    handleUserLogout() {
        let user = {};
        this.props.setUser(user);
        this.props.history.push('/login');
    }

    render() {
        const self = this;
        let { data, showReportDialog, dialogContent, open } = self.state;
        let noDataText = 'No reports submitted';

        return (
            <div className='row justify-content-center'>
                <div className='col-12 ml-5 mt-3'>
                    <RaisedButton
                        type="button"
                        disabled={false}
                        style={logoutStyle}
                        buttonStyle={buttonStyle}
                        labelStyle={labelStyle}
                        onClick={() => {
                            self.handleUserLogout();
                        }}
                        secondary={true}
                    >Logout</RaisedButton>
                </div>
                <h3 className='col-3 text-align-center mt-3 mb-5'>Admin Report Dashboard</h3>
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
                    {showReportDialog ? <AdminReportDialog content={dialogContent} open={open}
                                                           onClose={this.onClose.bind(this)}
                                                           fetchAllUsersReport={this.fetchAllUsersReport.bind(this)}
                    /> : <div></div>
                    }
                </div>
            </div>
        )
    }

}

AdminReportTable.propTypes = {
    currentUser: PropTypes.object.isRequired
};

/**
 * Fetch contents from redux store and bind to props in return value
 * @param {*} state
 */
const mapStateToProps = state => ({
    currentUser: state.user.userInfo
})

/**
 * Bind redux state modifying actions to props
 */
const mapDispatchToProps = {
    setUser
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminReportTable));