import React from 'react';

const ChildHeadCells = () => {
  return [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Name',
    },
    { id: 'age', numeric: true, disablePadding: false, label: 'Age' },
    { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
    {
      id: 'birthday',
      numeric: false,
      disablePadding: false,
      label: 'Birthday',
    },
    {
      id: 'monthlyPayment',
      numeric: true,
      disablePadding: false,
      label: 'Monthly Payment',
    },
  ];
};

export default ChildHeadCells;
