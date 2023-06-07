import { Menu, MenuProps } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const items: MenuProps['items'] = [
  {
    label: <Link to="/">Home</Link>,
    key: 'home',
  },
  {
    label: <Link to="/login">Login</Link>,
    key: 'login',
  },
  {
    label: <Link to="/register">Register</Link>,
    key: 'register',
  },
];

export const NavigationBar = () => {
  const [current, setCurrent] = useState('home');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
