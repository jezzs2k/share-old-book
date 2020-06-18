import React from 'react';
import { Card, Col } from 'antd';

const { Meta } = Card;

const BookItem = ({ book }) => {
  const { thumbnail, price, file, title } = book;
  return (
    <Col span={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <a href={file}>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt='thumbnail' src={thumbnail} />}>
          <Meta
            title={title}
            description={price !== 0 ? price + 'đ' : 'Free'}
          />
        </Card>
      </a>
    </Col>
  );
};

export default BookItem;
