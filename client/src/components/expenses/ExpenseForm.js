import React, { useState, Fragment } from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { addExpense } from '../../actions/expenses';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const ExpenseForm = ({ addExpense, history }) => {
  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    payFor: '',
    payTo: '',
    description: '',
  });

  const { date, amount, payFor, payTo, description } = formData;

  //Function for submitting form -> Also contains testing axios4777777777
  const onSubmit = async (e) => {
    e.preventDefault();
    if (amount === '' || payFor === '' || payTo === '') {
      setAlert('Please fill amount,to,for fields with data', 'danger');
    } else if (amount < 0) {
      setAlert('Amount cannot be less than 0', 'danger');
    } else {
      addExpense(formData, history); //This addExpense calls action 'addExpense' from /actions/expenses.js
    }
    setFormData({
      date: '',
      amount: '',
      payFor: '',
      payTo: '',
      description: '',
    });
  };

  //Function for updating state changes in fields
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  return (
    <Fragment>
      <h1 className="large text-primary">הוצאות</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> הוסיפ/י הוצאה חדשה כאן
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <h4>תאריך</h4>
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <h4>סכום</h4>
          <input
            type="text"
            min="0"
            placeholder="הכנס סכום"
            name="amount"
            value={amount}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <h4>תשלום עבור</h4>
          <select
            name="payFor"
            value={payFor}
            className="browser-default"
            onChange={(e) => onChange(e)}
          >
            <option value="" disabled>
              בחר מהרשימה
            </option>
            <option value="קניות">קניות</option>
            <option value="פעילות בגן">פעילות בגן</option>
            <option value="תיקון">תיקון</option>
            <option value="רכישת ציוד לגן">רכישת ציוד לגן</option>
            <option value="חשבון חודשי">חשבון חודשי</option>
          </select>
        </div>
        <div className="form-group">
          <h4>שולם לפקודת</h4>
          <select
            name="payTo"
            value={payTo}
            className="browser-default"
            onChange={(e) => onChange(e)}
          >
            <option value="" disabled>
              בחר מהרשימה
            </option>
            <option value="סטופ מרקט">סטופ מרקט</option>
            <option value="שופרסל">שופרסל</option>
            <option value="רמי לוי">רמי לוי</option>
            <option value="ירוק">ירוק</option>
            <option value="מחסני להב">מחסני להב</option>
            <option value="חשבון חשמל">חשבון חשמל</option>
            <option value="חשבון מים">חשבון מים</option>
            <option value="חשבון גז">חשבון גז</option>
            <option value="ארנונה">ארנונה</option>
            <option value="שכירות">שכירות</option>
          </select>
        </div>
        <div className="form-group">
          <h4>תיאור</h4>
          <input
            type="text"
            placeholder="תיאור"
            name="description"
            value={description}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" value="אישור" />
      </form>
    </Fragment>
  );

  /*  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };*/

  /*return (
  <Form
    onSubmit={(e) => onSubmit(e)}
    labelCol={{
      span: 4,
    }}
    wrapperCol={{
      span: 14,
    }}
    layout="horizontal"
    initialValues={{
      size: componentSize,
    }}
    onValuesChange={onFormLayoutChange}
    size={componentSize}
  >
    <Form.Item label="תאריך">
      <DatePicker
        placeholder="בחר/י תאריך"
        name="date"
        value={date}
        onChange={onChange}
      />
    </Form.Item>
    <Form.Item label="סכום">
      <InputNumber min="0" name="amount" value={amount} onChange={onChange} />
    </Form.Item>

    <Form.Item label="שולם עבור">
      <Select name="payFor" value={payFor} onChange={onChange}>
        <Select.Option value="groceries">קניות</Select.Option>
        <Select.Option value="activity">פעילות בגן</Select.Option>
        <Select.Option value="fixProperty">תיקון</Select.Option>
        <Select.Option value="buyEquipment">רכישת ציוד לגן</Select.Option>
        <Select.Option value="bill">חשבון חודשי</Select.Option>
      </Select>
    </Form.Item>

    <Form.Item label="שולם ל">
      <Select name="payTo" value={payTo} onChange={onChange}>
        <Select.Option value="stopMarket">סטופ מרקט</Select.Option>
        <Select.Option value="shufersal">שופרסל</Select.Option>
        <Select.Option value="ramiLevi">רמי לוי</Select.Option>
        <Select.Option value="yarok">ירוק</Select.Option>
        <Select.Option value="lahav">מחסני להב</Select.Option>
        <Select.Option value="electricity">חשבון חשמל</Select.Option>
        <Select.Option value="water">חשבון מים</Select.Option>
        <Select.Option value="gas">חשבון גז</Select.Option>
        <Select.Option value="arnona">ארנונה</Select.Option>
        <Select.Option value="rent">שכירות</Select.Option>
      </Select>
    </Form.Item>
    <Form.Item label="תיאור">
      <Input name="description" value={description} onChange={onChange} />
    </Form.Item>
    <Form.Item style={{ marginLeft: '90px' }}>
      <Button type="primary" htmlType="submit">
        סיימתי
      </Button>
    </Form.Item>
  </Form>
  );
  */
};

ExpenseForm.propTypes = {
  addExpense: PropTypes.func.isRequired,
};
export default connect(null, { addExpense })(withRouter(ExpenseForm));
