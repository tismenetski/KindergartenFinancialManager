import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getExpenses } from '../../actions/expenses';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import AntTableExpenses from './AntTableExpenses';
import ExpenseForm from './ExpenseForm';

const Expenses = ({ getExpenses, expense: { expenses, loading } }) => {
  useEffect(() => {
    getExpenses();
  }, [getExpenses]);
  return loading ? (
    <Spinner /> //
  ) : (
    <div>
      <ExpenseForm />
      <AntTableExpenses passedData={expenses} />
    </div>
  );
};

Expenses.propTypes = {
  getExpenses: PropTypes.func.isRequired,
  expense: PropTypes.object.isRequired,
};

//
const mapStateToProps = (state) => ({
  expense: state.expense,
});

export default connect(mapStateToProps, { getExpenses })(Expenses);
