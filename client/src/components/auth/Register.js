import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import { Link, Redirect } from 'react-router-dom';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"> Create Your Account</i>
        </p>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              minLength="6"
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value={password2}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, setAlert })(Register);
