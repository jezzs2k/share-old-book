import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Button, Row, Col, Avatar, Tooltip } from 'antd';
import { MenuFoldOutlined, PlusCircleOutlined } from '@ant-design/icons';

import './Navbar.css';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
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
                src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
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
        {true && (
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
          <Button type='primary'>
            <PlusCircleOutlined />
            Create new book
          </Button>
          {true ? (
            <p className='logout'>Logout</p>
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
