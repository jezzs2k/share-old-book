import React, { useContext, useEffect, Fragment } from 'react';
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import { Link } from 'react-router-dom';

import './Login.css';

import AuthContext from '../../context/Auth/authContext';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 20,
  },
};

const LoginForm = (props) => {
  const authContext = useContext(AuthContext);

  let { login, isAuthenticated, error } = authContext;
  const onFinish = (values) => {
    login(values);
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    Error(errorInfo);
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (isAuthenticated || localStorage.token) {
      props.history.push('/');
    }

    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <Fragment>
      {error && (
        <Alert message={error.message} className='alert-dev' type='error' />
      )}
      <div className='login'>
        <div className='backHome'>
          <Link to='/'>Back to Home</Link>
        </div>
        <h2 className='title'>LOGIN</h2>
        <Form
          {...layout}
          name='basic'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
          <Link to='/register' className='linkToRegister'>
            Create new account
          </Link>
        </Form>
      </div>
    </Fragment>
  );
};

export default LoginForm;
