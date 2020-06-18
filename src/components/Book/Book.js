import React, { useContext, useEffect, useState } from 'react';
import { Skeleton, Select, Switch, Row } from 'antd';

import BookContext from '../../context/Book/bookContext';
import AuthContext from '../../context/Auth/authContext';

import BookItem from './BookItem';

import './Book.css';

const { Option } = Select;

const categoryBooks = [
  'Chính trị – pháp luật',
  'Khoa học công nghệ – Kinh tế.',
  'Văn hóa xã hội – Lịch sử.',
  'Văn học nghệ thuật.',
  'Giáo trình.',
  'Truyện, tiểu thuyết.',
  'Tâm lý, tâm linh, tôn giáo.',
  'Sách thiếu nhi.',
];

const Books = () => {
  const bookContext = useContext(BookContext);
  const authContext = useContext(AuthContext);

  const { books, loading, loadBookByCondition, loadBooks } = bookContext;
  const { isAuthenticated } = authContext;

  const [categoryChange, setCategoryChange] = useState('Filter book');

  const onChange = (e) => {
    setCategoryChange(e);
    loadBookByCondition(e);
  };

  useEffect(() => {
    if (localStorage.token || isAuthenticated) {
      loadBooks();
    } else {
      loadBookByCondition('free');
    }

    // eslint-disable-next-line
  }, [isAuthenticated]);

  const [isFree, setCost] = useState(false);
  const handlePayment = (e) => {
    setCost(e);
    if (e) {
      loadBookByCondition('free');
    } else {
      loadBooks();
    }
  };
  if (loading) {
    return <Skeleton active />;
  }

  return (
    <div className='books'>
      <div className='select-category'>
        <Select
          style={{ maxWidth: 500, width: '100%' }}
          value={categoryChange}
          onChange={onChange}>
          {categoryBooks.map((category) => (
            <Option key={category}>{category}</Option>
          ))}
        </Select>

        <Switch onChange={handlePayment} className='choose-free-book' />
        <span className='text'>{!isFree ? 'Free' : 'All'}</span>
      </div>
      <div className='center'>
        <Row justify='space-around'>
          {books && books.map((book) => <BookItem book={book} />)}
        </Row>
      </div>
    </div>
  );
};

export default Books;
