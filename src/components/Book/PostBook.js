import React, { useState, useContext } from 'react';
import {
  Form,
  Input,
  Button,
  Upload,
  Skeleton,
  Progress,
  Select,
  Switch,
  InputNumber,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { storage } from '../../firebase';

import './PostBook.css';

import BookContext from '../../context/Book/bookContext';
import AuthContext from '../../context/Auth/authContext';

const { Option } = Select;

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

const BookItem = ({ history }) => {
  const bookContext = useContext(BookContext);
  const authContext = useContext(AuthContext);

  const { createBook } = bookContext;
  const { user } = authContext;

  const [progress, setProgress] = useState(null);

  const [imageAsFile, setImageAsFile] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [imageAsUrl, setImageAsUrl] = useState('');

  const handleImageAsFile = (e) => {
    const file = e.file.originFileObj;
    setImageAsFile((imageFile) => file);
    handleFireBaseUpload(setImageAsUrl);
  };

  const handleFile = (e) => {
    const file = e.file.originFileObj;
    setImageAsFile((imageFile) => file);
    handleFireBaseUpload(setFileUrl);
  };

  const handleFireBaseUpload = (fn) => {
    if (imageAsFile === '') {
      console.error(`Not an image, the image file is a ${typeof imageAsFile}`);
    }

    const uploadTask = storage
      .ref(`/files/${imageAsFile.name}`)
      .put(imageAsFile);

    uploadTask.on(
      'state_changed',
      (snapShot) => {
        setProgress(
          Math.round((snapShot.bytesTransferred / snapShot.totalBytes) * 100)
        );
      },
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .ref('files')
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            fn(fireBaseUrl);
            setImageAsFile('');
          });
      }
    );
  };

  const [skeletonState, setSkeletonState] = useState(false);
  const handleUpload = () => {
    setSkeletonState(true);
  };

  const [title, setTitle] = useState('');
  const onChange = (e) => {
    setTitle(e.target.value);
  };

  const [isFree, setCost] = useState(true);
  const handlePayment = (e) => {
    setCost(e);
  };

  const [categoryChange, setCategoryChange] = useState(categoryBooks[0]);

  const onFinish = (values) => {
    createBook({
      title: title,
      file: fileUrl,
      category: categoryChange,
      thumbnail: imageAsUrl,
      price: isFree ? 0 : values.price,
      postedNickName: user.nickname,
      postedAvatar: user.avatar,
      userId: user.id,
    });

    history.push('/');
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    Error(errorInfo);
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='Post_Article'>
      <Form
        {...layout}
        name='basic'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item label='Name Book'>
          <Input
            className='state-user'
            placeholder='Name ... '
            allowClear
            value={title}
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item label='Select Category'>
          <Select
            style={{ width: 420 }}
            value={categoryChange}
            onChange={setCategoryChange}>
            {categoryBooks.map((category) => (
              <Option key={category}>{category}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label={isFree ? 'Free' : 'Has Cost'}>
          <Switch onChange={handlePayment} defaultChecked />
        </Form.Item>
        {!isFree && (
          <Form.Item
            name='price'
            label='Price'
            rules={[{ type: 'number', min: 0 }]}>
            <InputNumber />
          </Form.Item>
        )}
        <Form.Item label='File eBook'>
          <Upload name='file' onChange={handleFile}>
            <Button>
              <UploadOutlined /> Click to upload
            </Button>
          </Upload>
          {progress && (
            <Progress
              percent={fileUrl !== '' ? 100 : progress}
              status='active'
            />
          )}
        </Form.Item>
        {fileUrl && (
          <Form.Item
            label='Thumbnail(Hình ảnh miêu tả sách)'
            onClick={handleUpload}>
            <Upload name='file' onChange={handleImageAsFile}>
              <Button>
                <UploadOutlined /> Click to upload
              </Button>
            </Upload>
            {imageAsUrl && progress && (
              <Progress percent={imageAsUrl ? 100 : progress} status='active' />
            )}
            {skeletonState &&
              (imageAsUrl !== '' ? (
                <div className='preview'>
                  <img
                    src={imageAsUrl}
                    className='article-img'
                    alt='book-img'
                  />
                </div>
              ) : (
                <Skeleton active />
              ))}
          </Form.Item>
        )}

        <Form.Item {...tailLayout}>
          {fileUrl && imageAsUrl !== '' ? (
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          ) : (
            <Button type='primary' htmlType='submit' disabled>
              Submit
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default BookItem;
