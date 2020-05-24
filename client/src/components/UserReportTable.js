/*======================================================================================================================
 * import main libraries
 *====================================================================================================================*/
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table-6';
import FontAwesome from 'react-fontawesome';
import { helpers } from '../helpers/index';
import UserReportDialog from './UserReportDialog';

const style = {
    dangerColor: '#f44336',
    warningColor: '#ff8c00',
    successColor: '#4caf50'
}

const btnStyle = {
    borderStyle: 'none',
    backgroundColor: 'transparent'
}

/*======================================================================================================================
 * define react component
 *====================================================================================================================*/
class UserReportTable extends React.Component {

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
                reportId: "1",
                userId: "2",
                reportDate: "2020-05-24T11:01:47.220Z",
                content: "User 2: this is my first report",
                status: "pending",
                createdAt: "2020-05-24T11:01:47.220Z",
                updatedAt: "2020-05-24T11:01:47.220Z"
            },
            {
                reportId: "2",
                userId: "2",
                reportDate: "2020-05-24T11:01:47.220Z",
                content: "User 2: this is my second report",
                status: "pending",
                createdAt: "2020-05-24T11:01:47.220Z",
                updatedAt: "2020-05-24T11:01:47.220Z"
            },
            {
                reportId: "3",
                userId: "3",
                reportDate: "2020-05-24T11:01:47.220Z",
                content: "User 3: this is my first report",
                status: "approved",
                createdAt: "2020-05-24T11:01:47.220Z",
                updatedAt: "2020-05-24T11:01:47.220Z"
            },
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
                Header: 'Report Id',
                accessor: 'reportId',
                id: 'reportId',
                width: 200
            },
            {
                Header: 'Report Date',
                accessor: '',
                id: 'reportDate',
                width: 250,
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
                width: 150,
                Cell: ({original}) => {
                    return self.formatStatusColor(original.status);
                }
            },
            {
                Header: 'View Report',
                accessor: '',
                style: {textAlign: 'center'},
                width: 200,
                filterable: false,
                sortable: false,
                Cell: ({original}) => {
                    return (
                        <button className='fontawesom-btn' style={btnStyle} onClick={() => self.handleReportDialog(original.content)}>
                            <FontAwesome
                                style={{color: '#0091f4', marginLeft: 9}}
                                disabled={false}
                                name='edit'
                                size='2x'
                            />
                        </button>
                    )
                }
            },
            {
                Header: 'Updated Date',
                accessor: '',
                id: 'updatedAt',
                width: 250,
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

    handleReportDialog(content) {
        this.setState({
            showReportDialog: true,
            open: true,
            dialogContent: content
        })
    }

    onClose() {
        this.setState({
            showReportDialog: false,
            open: false,
            dialogContent: ''
        })
    }

    render() {
        let { data, showReportDialog, dialogContent, open } = this.state;
        let noDataText = 'No reports submitted';

        return (
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
                {showReportDialog ? <UserReportDialog content={dialogContent} open={open} onClose={this.onClose.bind(this)}/> : <div></div>
                }
            </div>
        )
    }

}

UserReportTable.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserReportTable));