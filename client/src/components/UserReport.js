/*======================================================================================================================
 * import main libraries
 *====================================================================================================================*/
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import RaisedButton from "material-ui/RaisedButton";
import moment from 'moment';
import * as UsersModel from '../models/user';


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

const UserReport = (props) => {
    Date.prototype.toDateInputValue = (function() {
        let local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0,10);
    });

    return(
        <Formik
            initialValues = {{date: new Date().toDateInputValue(), username: '', report: ''}}
            onSubmit = {(values, {setSubmitting}) => {
                setTimeout(() => {
                    console.log("Submitting form =>> ", values);
                    console.log(moment(values.date).toISOString());

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
                        <div>
                            <h1>User Report Form</h1>
                            <form onSubmit={handleSubmit}>
                                <label for="date">Date</label>
                                <input
                                    name="date"
                                    type="date"
                                    placeholder="Select date"
                                    value={values.date}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.date && touched.date && "error"}
                                />
                                {errors.date && touched.date && (
                                    <div className="input-feedback">{errors.date}</div>
                                )}

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
                                    primary="true"
                                >Submit</RaisedButton>
                            </form>
                        </div>
                    )
                }
            }
        </Formik>)
}

UserReport.propTypes = {
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserReport));
