/*======================================================================================================================
 * import main libraries
 *====================================================================================================================*/
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import RaisedButton from 'material-ui/RaisedButton';
import { setUser } from '../actions/user';
import * as UserModel from '../models/user';
import {helpers} from "../helpers";

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
const promptAlertMessage = 'Sorry this username is already taken. Please try again.';
const loginAlertMessage = 'Login failed. Please check your credentials.';

/*======================================================================================================================
 * define react component
 *====================================================================================================================*/
class UserLogin extends React.Component {
    constructor() {
        super();
        this.state = {
            isRegisterButton: false
        };
    }

    handleUserLogin(data) {
        UserModel.userLogin(data, (response) => {
            if(response && !helpers.general.isEmpty(response.user)) {
                // Correct credentials provided
                let user = response.user;
                this.props.setUser(user);
                // Redirects user to correct page
                if(user.userType === 'admin') {
                    this.props.history.push('/admin');
                } else {
                    this.props.history.push('/report');
                }
                // Wrong credentials provided
            } else {
                helpers.general.promptAlert({message: loginAlertMessage}, (status) => {
                    if(status) {
                        this.props.history.push('/login');
                    }
                })
            }
        })
    }

    handleRegisterNewUser(data) {
        UserModel.registerNewUser(data, (response) => {
            // Username not taken hence proceed to register
            if(response && response.user) {
                let user = response.user;
                this.props.setUser(user);
                this.props.history.push('/report');
            } else {
                helpers.general.promptAlert({message: promptAlertMessage}, (status) => {
                    if(status) {
                        this.setState({isRegisterButton: false});
                    }
                })
            }
        })
    }

    render() {
        const self = this;

        return (
            <Formik
                initialValues = {{username: '', password: ''}}
                onSubmit = {(values, {setSubmitting}) => {
                    let { username, password } = values;
                    let data = { userName: username, password: password };
                    // Toggle between login and register buttons
                    if(self.state.isRegisterButton) {
                        this.handleRegisterNewUser(data);
                    } else {
                        this.handleUserLogin(data);
                    }
                    setSubmitting(false);
                }}
                validationSchema={Yup.object().shape({
                    username:
                        Yup.string()
                            .min(5, "Username should be between 5-20 characters.")
                            .max(20, "Username should be between 5-20 characters.")
                            .required("Required*"),
                    password:
                        Yup.string()
                            .min(5, "Password should be a between 5-20 characters.")
                            .max(20, "Password should be a between 5-20 characters.")
                            .required("Required*")
                })}
            >
                {
                    (props) => {
                        const {values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue} = props;

                        return(
                            <div>
                                <h1>User Login</h1>
                                <form onSubmit={handleSubmit}>
                                    <label for="username">Username</label>
                                    <input
                                        name="username"
                                        type="text"
                                        placeholder="Enter your username"
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.username && touched.username && "error"}
                                    />
                                    {errors.username && touched.username && (
                                        <div className="input-feedback">{errors.username}</div>
                                    )}
                                    <label for="password">Password</label>
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.password && touched.password && "error"}
                                    />
                                    {errors.password && touched.password && (
                                        <div className="input-feedback">{errors.password}</div>
                                    )}

                                    <div className='row'>
                                        <div className='col-3'>
                                            <RaisedButton
                                                type="button"
                                                disabled={isSubmitting}
                                                style={style}
                                                buttonStyle={buttonStyle}
                                                labelStyle={labelStyle}
                                                primary={true}
                                                onClick={async (e) => {
                                                    self.setState({isRegisterButton: false}, () =>{
                                                        handleSubmit(e)
                                                    })}
                                                }
                                            >Login</RaisedButton>
                                        </div>
                                        <div className='col-3'>
                                            <RaisedButton
                                                type="button"
                                                disabled={isSubmitting}
                                                style={style}
                                                buttonStyle={buttonStyle}
                                                labelStyle={labelStyle}
                                                primary={true}
                                                onClick={async (e) => {
                                                    self.setState({isRegisterButton: true}, () =>{
                                                        handleSubmit(e)
                                                    })}
                                                }
                                            >Register</RaisedButton>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )
                    }
                }
            </Formik>
        )
    }

}

UserLogin.propTypes = {
    setUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    currentUser: state.user.userInfo
});

const mapDispatchToProps = {
    setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserLogin));