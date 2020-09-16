import React from 'react';
import 'antd/dist/antd.css';
//import './index.css';
import { Table } from 'antd';

const { Column } = Table;

const AntTableSalaries = ({ passedData }) => {
  return (
    <Table dataSource={passedData} rowKey="_id">
      <Column title="שם עובד" dataIndex={['worker', 'name']} key="worker" />
      <Column title="תאריך" dataIndex="date" key="date" />
      <Column title="שעות נוכחות" dataIndex="hours" key="hours" />
      <Column title="שכר לשעה" dataIndex="hourRate" key="hourRate" />
      <Column
        title="תשלום נסיעות"
        dataIndex="travelExpenses"
        key="travelExpenses"
      />
      <Column title="סך הכל לתשלום" dataIndex="total" key="total" />
      {/*    <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <a>Invite {record.lastName}</a>
              <a>Delete</a>
            </Space>
          )}
        /> */}
    </Table>
  );
};

export default AntTableSalaries;
