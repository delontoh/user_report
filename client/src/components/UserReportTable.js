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
import UserReportDialog from './UserReportDialog';

const style = {
    dangerColor: '#f44336',
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
        };
    }

    formatStatusColor(status) {
        switch (status) {
            case 'deleted':
                return <span style={{color: style.dangerColor}}>{helpers.general.prettifyConstant(status)}</span>;
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
                width: 250
            },
            {
                Header: 'Report Date',
                accessor: '',
                id: 'reportDate',
                width: 250,
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
                width: 150,
                style: {textAlign: 'center'},
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
                Header: 'Updated Date/Time',
                accessor: '',
                id: 'updatedAt',
                width: 200,
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
        let { showReportDialog, dialogContent, open } = this.state;
        let { data } = this.props;
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
    data: PropTypes.array.isRequired
};

/**
 * Fetch contents from redux store and bind to props in return value
 * @param {*} state
 */
const mapStateToProps = state => ({
})

/**
 * Bind redux state modifying actions to props
 */
const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserReportTable));