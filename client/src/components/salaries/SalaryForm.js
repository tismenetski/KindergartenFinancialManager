import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSalary } from '../../actions/salaries';

//This form should be filled when browsing a worker and adding him a salary -- > NOT FINISHED
const SalaryForm = (props) => {
  const [formData, setFormData] = useState({
    date: '',
    hours: '',
    hourRate: '',
    total: '',
  });
  return <div></div>;
};

SalaryForm.propTypes = {};

export default SalaryForm;
