/*======================================================================================================================
 * import main libraries
 *====================================================================================================================*/
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { Dialog, TextField } from 'material-ui';

/*======================================================================================================================
 * define react component
 *====================================================================================================================*/
class UserReportDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    closeDialog() {
        let { onClose } = this.props;
        onClose();
    }

    render() {
        let { content, open } = this.props;

        return(
            <div>
                <Dialog
                    title={<div>
                        <FontAwesome
                            className="float-right"
                            onClick={this.closeDialog.bind(this)}
                            name='times-circle-o'
                            style={{color: "black", marginRight: -10, marginTop: -10, cursor: 'pointer'}}
                            size='2x'/>&nbsp;
                    </div>}
                    style={{padding: 20}}
                    contentClassName="dialog-container"
                    modal={false}
                    open={open}
                    onRequestClose={this.closeDialog.bind(this)}
                    autoScrollBodyContent={true}
                    repositionOnUpdate={true}
                >
                    <div className="text-align-center">
                        <TextField
                            id="multiline-static"
                            multiline
                            rows={10}
                            disabled={true}
                            value={content}
                        />
                    </div>
                </Dialog>
            </div>
        )
    }

}

UserReportDialog.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserReportDialog));