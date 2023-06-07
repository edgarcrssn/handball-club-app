import { Input, Button, Form, message } from 'antd';
import styles from './Login.module.scss';
import { DashboardSkeleton } from '../../components/DashboardSkeleton/DashboardSkeleton';
import { redirect } from 'react-router-dom';

export const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values: { email: string; password: string }) => {
    fetch('http://localhost:3002/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else messageApi.error('Wrong credentials');
      })
      .then((data: { token: string }) => {
        localStorage.setItem('token', data.token);
        redirect('/');
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
                Se connecter
              </Button>
            </Form.Item>
          </Form>
        </div>
      </DashboardSkeleton>
    </>
  );
};
