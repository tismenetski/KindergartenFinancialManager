import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getSalaries } from '../../actions/salaries';

const Salaries = ({ getSalaries, salary: { salaries, loading } }) => {
  useEffect(() => {
    getSalaries();
  }, [getSalaries]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary"></h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to salaries information
      </p>
    </Fragment>
  );
};

Salaries.propTypes = {
  getSalaries: PropTypes.func.isRequired,
  salary: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  salary: state.salary,
});

export default connect(mapStateToProps, { getSalaries })(Salaries);
