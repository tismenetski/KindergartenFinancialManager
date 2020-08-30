import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((
    alert //Check if alerts array is not null , then check that is greater than 0 , then iterate each alert item and output jsx
  ) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {' '}
      {/*the output is determined by the css class the alert type produces*/}
      {alert.msg} {/*The alert message*/}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

// mapStateToProps is a redux function
//It is called every time the store state changes.
// It receives the entire store state, and should return an object of data this component needs.
const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
