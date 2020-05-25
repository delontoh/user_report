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
import * as UserModel from '../models/user';
import UserReportTable from './UserReportTable';

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
class UserReport extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        let { currentUser, history } = this.props;

        if(!currentUser) {
            history.push('/login');
        } else {
            // Redirects user to admin page if userType is admin
            if(currentUser.userType && currentUser.userType === 'admin') {
                history.push('/admin');
            } else {
                // Fetch all user reports by userId
                this.fetchUserReports(currentUser);
            }
        }
    }

    fetchUserReports(currentUser) {
        let query = {
            userId: currentUser.userId
        };
        UserModel.getUserReportsByUserId(query, (response) => {
            if(response && response.userReports) {
                this.setState({data: response.userReports});
            }
        });
    }

    createDefaultDate() {
        let date = new Date();
        return moment(date).format('YYYY-MM-DD');
    }

    render() {
        const self = this;
        let { data } = self.state;
        let { currentUser } = self.props;
        let defaultDate = self.createDefaultDate();
        let userName = currentUser && currentUser.userName ? currentUser.userName : '';

        return(
            <div className="row justify-content-center">
                <Formik
                    initialValues = {{date: defaultDate, username: userName, report: ''}}
                    onSubmit = {(values, {setSubmitting}) => {
                        // format date to iso string
                        values.date = moment(values.date).toISOString();
                        // prepare data for update
                        let query = {
                            userId: '1',
                            reportDate: values.date,
                            content: values.report ? JSON.stringify(values.report) : ''
                        };
                        UserModel.submitReport(query, (response) => {
                            if(response && response.report) {
                                self.fetchUserReports();
                            }
                        });
                        setSubmitting(false);
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
                                            primary={true}
                                        >Submit</RaisedButton>
                                    </form>
                                </div>
                            )
                        }
                    }
                </Formik>
                <UserReportTable data={data}/>
            </div>
        )
    }
}

UserReport.propTypes = {
};

const mapStateToProps = state => ({
    currentUser: state.user.userInfo
});

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserReport));
