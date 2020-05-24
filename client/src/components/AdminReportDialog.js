/*======================================================================================================================
 * import main libraries
 *====================================================================================================================*/
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Formik} from "formik";
import * as Yup from "yup";
import FontAwesome from 'react-fontawesome';
import { Dialog, TextField } from 'material-ui';
import * as UsersModel from "../models/user";
import RaisedButton from "material-ui/RaisedButton";

const style = {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    height: 40,
};
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
class AdminReportDialog extends React.Component {

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
                    title={<div>Report Content
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
                    <Formik
                        initialValues = {{date: content.date, username: content.userName, report: content.content}}
                        onSubmit = {(values, {setSubmitting}) => {
                            setTimeout(() => {
                                console.log("Submitting form =>> ", values);
                                // update report given report Id
                                UsersModel.submitReport(values, () => {
                                    console.log('Form submitted sucessfully')
                                });

                                setSubmitting(false);
                            }, 500);
                        }}
                        validationSchema={Yup.object().shape({
                            report:
                                Yup.string()
                                    .max(250, "Maximum of 250 characters")
                                    .required("Required*")
                        })}
                    >
                        {
                            (props) => {
                                const {values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit} = props;

                                return(
                                    <div className='col-12 mb-5'>
                                        <h1>User Report Form</h1>
                                        <form onSubmit={handleSubmit}>
                                            <label for="date">Date</label>
                                            <input
                                                name="date"
                                                type="date"
                                                placeholder="Select date"
                                                value={values.date}
                                                className={errors.date && touched.date && "error"}
                                            />

                                            <label for="username">Username</label>
                                            <input
                                                name="username"
                                                type="text"
                                                placeholder="Username"
                                                value={values.username}
                                                disabled={true}
                                            />

                                            <label for="report">Report:</label>
                                            <textarea
                                                name="report"
                                                placeholder="Write report here (max 250 characters)"
                                                value={values.report}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.report && touched.report && "error"}
                                            />
                                            {errors.report && touched.report && (
                                                <div className="input-feedback">{errors.report}</div>
                                            )}

                                            <RaisedButton
                                                type="submit"
                                                disabled={isSubmitting}
                                                style={style}
                                                buttonStyle={buttonStyle}
                                                labelStyle={labelStyle}
                                                primary={true}
                                            >Save</RaisedButton>
                                        </form>
                                    </div>
                                )
                            }
                        }
                    </Formik>
                </div>
                </Dialog>
            </div>
        )
    }

}

AdminReportDialog.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminReportDialog));