import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Button, Row, Col, Avatar, Tooltip } from 'antd';
import { MenuFoldOutlined, PlusCircleOutlined } from '@ant-design/icons';

import './Navbar.css';

import AuthContext from '../../context/Auth/authContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, loadUser, user, logout } = authContext;

  useEffect(() => {
    if (isAuthenticated || localStorage.token) {
      loadUser();
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      <div className='top'>
        <Row>
          <Col xs={6} sm={4} md={6} lg={8} xl={10}>
            <Button type='primary' onClick={showDrawer}>
              <MenuFoldOutlined className='menu-icon' />
            </Button>
          </Col>
          <Col xs={14} sm={16} md={12} lg={8} xl={4}>
            <h2 className='title'>
              <span className='red'>Sh</span>are ol
              <span className='orange'>D</span>{' '}
              <span className='yellow'>B</span>o
              <span className='purple'>O</span>k
            </h2>
          </Col>
          <Col xs={4} sm={4} md={6} lg={8} xl={10}>
            <Tooltip placement='bottom' title='your account'>
              <Avatar
                src={
                  user
                    ? user.avatar
                    : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                }
                className='avatar-user'
              />
            </Tooltip>
          </Col>
        </Row>
      </div>
      <Drawer
        title='Share olD BoOk'
        placement='left'
        closable={false}
        onClose={onClose}
        visible={visible}
        key='left'>
        <div className='ebook-free'>
          <h3 className='title-item'>Read Free</h3>
          <Link to='#/' className='ebook-item'>
            Name eBook Free
          </Link>
          <Link to='#/' className='ebook-item'>
            Name eBook Free
          </Link>
          <Link to='#/' className='ebook-item'>
            Name eBook Free
          </Link>
          <Link to='#/' className='ebook-item'>
            Name eBook Free
          </Link>
          <Link to='#/' className='ebook-item'>
            More ...
          </Link>
        </div>
        {isAuthenticated && (
          <div className='book-of-user'>
            <h3 className='title-item'>Your book</h3>
            <Link to='#/' className='ebook-item'>
              Name Book
            </Link>
            <Link to='#/' className='ebook-item'>
              Name Book
            </Link>
            <Link to='#/' className='ebook-item'>
              Name Book
            </Link>
            <Link to='#/' className='ebook-item'>
              Name Book
            </Link>
            <Link to='#/' className='ebook-item'>
              More ...
            </Link>
          </div>
        )}
        <div className='action'>
          <Link to='/create/book'>
            <Button type='primary'>
              <PlusCircleOutlined />
              Create new book
            </Button>
          </Link>

          {isAuthenticated ? (
            <p className='logout' onClick={handleLogout}>
              Logout
            </p>
          ) : (
            <div>
              <Link className='login-link' to='/login'>
                Login
              </Link>
              <Link className='register-link' to='/register'>
                Register
              </Link>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
