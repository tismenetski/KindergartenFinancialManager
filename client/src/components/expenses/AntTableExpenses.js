import React from 'react';
import 'antd/dist/antd.css';
//import './index.css';
import { Table } from 'antd';

const { Column } = Table;

const AntTable = ({ passedData }) => {
  return (
    <Table dataSource={passedData} rowKey="_id">
      <Column title="תאריך" dataIndex="date" key="date" />
      <Column title="סכום" dataIndex="amount" key="amount" />
      <Column title="שולם עבור" dataIndex="payFor" key="payFor" />
      <Column title="שולם ל" dataIndex="payTo" key="payTo" />
      <Column title="תיאור" dataIndex="description" key="description" />
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

export default AntTable;
