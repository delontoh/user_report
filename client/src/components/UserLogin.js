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

const UserLogin = (props) => {
    return(
    <Formik
        initialValues = {{username: '', password: ''}}
        onSubmit = {(values, {setSubmitting}) => {
            setTimeout(() => {
                console.log("Logging in", values);



                setSubmitting(false);
            }, 500);
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
                const {values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit} = props;

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

                            <RaisedButton
                                type="submit"
                                disabled={isSubmitting}
                                style={style}
                                buttonStyle={buttonStyle}
                                labelStyle={labelStyle}
                                primary="true"
                            >Login</RaisedButton>

                        </form>
                    </div>
                )
            }
        }
    </Formik>)
}

UserLogin.propTypes = {
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserLogin));