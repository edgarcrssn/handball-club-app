import { Button, Form, Input, message } from 'antd';
import { DashboardSkeleton } from '../../components/DashboardSkeleton/DashboardSkeleton';
import styles from './Register.module.scss';
import { redirect } from 'react-router-dom';

export const Register = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    fetch('http://localhost:3002/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((response) => {
      if (response.ok) redirect('/login');
      else messageApi.error('Error');
    });
  };

  return (
    <>
      {contextHolder}
      <DashboardSkeleton>
        <div className={styles.form}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="First name"
              name="firstName"
              rules={[
                { required: true, message: 'Please input your firstName!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Last name"
              name="lastName"
              rules={[
                { required: true, message: 'Please input your lastName!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </DashboardSkeleton>
    </>
  );
};
