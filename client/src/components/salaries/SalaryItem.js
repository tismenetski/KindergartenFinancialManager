import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteSalary } from '../../actions/salaries';

//We need to assume that this item will recieve a salary

const SalaryItem = ({
  singleSalary: { date, hours, hourRate, total },
  deleteSalary,
  auth,
}) => {
  // const salaries =

  return (
    <Fragment>
      <div>
        <span>Date: </span>
        <Moment format="YYYY/MM">{date}</Moment>
      </div>
      <div>
        <span>Hours: </span>
        {hours}
      </div>

      <div>
        <span>Hour Rate: </span>
        {hourRate}
      </div>

      <div>
        <span>Total Payment: </span>
        {total}
      </div>
    </Fragment>
  );
};

SalaryItem.propTypes = {
  //   salaries: PropTypes.object.isRequired,
  singleSalary: PropTypes.object.isRequired,
  deleteSalary: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  salary: state.salary,
});

export default connect(mapStateToProps, { deleteSalary })(SalaryItem);
