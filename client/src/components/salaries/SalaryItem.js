import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteSalary } from '../../actions/salaries';

//We need to assume that this item will recieve a salary

const SalaryItem = ({
  salary: { _id, date, hours, hourRate, total },
  deleteSalary,
  auth,
}) => {
  // const salaries =

  return (
    <Fragment>
      <tr>
        <td>
          <Moment format="YYYY/MM">{date}</Moment>
        </td>
        <td>{hours}</td>
        <td>{hourRate}</td>
        <td>{total}</td>
      </tr>
    </Fragment>
  );
};

SalaryItem.propTypes = {
  //   salaries: PropTypes.object.isRequired,
  salary: PropTypes.object.isRequired,
  deleteSalary: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteSalary })(SalaryItem);
