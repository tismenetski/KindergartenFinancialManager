import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteSalary } from '../../actions/salaries';

const SalaryItem = ({ salaries, deleteSalary }) => {
  // const salaries =

  return <div></div>;
};

SalaryItem.propTypes = {
  salaries: PropTypes.object.isRequired,
  deleteSalary: PropTypes.func.isRequired,
};

export default connect(null, { deleteSalary })(SalaryItem);
