import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getWorkers } from '../../actions/workers';
import { Card } from 'antd';
import 'antd/dist/antd.css';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

const Workers = ({ getWorkers, worker: { workers, loading } }) => {
  useEffect(() => {
    getWorkers();
  }, [getWorkers]);

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <Card title="Workers">
        {workers.map((worker) => (
          <Card.Grid style={gridStyle} key={worker._id}>
            <h4>
              שם העובד:<span> {worker.name}</span>
            </h4>

            <br />
            <h4>
              גיל:<span> {worker.age}</span>
            </h4>
            <br />
            <h4>
              תאריך לידה:
              <span>
                {' '}
                <Moment format="DD-MM-YYYY">{worker.birthday}</Moment>
              </span>
            </h4>
            <br />
            <h4>
              תאריך תחילת עבודה:{' '}
              <span>
                {' '}
                <Moment format="DD-MM-YYYY">{worker.startWorkingDate}</Moment>
              </span>
            </h4>
            <br />
            <h4>
              שכר שעתי:<span> {worker.hourPaymentRate}</span> ש"ח
            </h4>
            <br />
          </Card.Grid>
        ))}
      </Card>
    </div>
  );
};

Workers.propTypes = {
  getWorkers: PropTypes.func.isRequired,
  worker: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  worker: state.worker,
});

export default connect(mapStateToProps, { getWorkers })(Workers);
