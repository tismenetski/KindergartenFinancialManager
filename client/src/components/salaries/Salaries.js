import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getSalaries } from '../../actions/salaries';
import AntTableSalaries from './AntTableSalaries';

const Salaries = ({ getSalaries, salary: { salaries, loading } }) => {
  useEffect(() => {
    getSalaries();
  }, [getSalaries]);
  return loading ? (
    <Spinner /> //
  ) : (
    // <div>
    //   {salaries.map((salary) => (
    //     <SalaryItem key={salary._id} singleSalary={salary} />
    //   ))}
    // </div>
    <AntTableSalaries passedData={salaries} />
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
