import React, { useReducer } from 'react';
import shortid from 'shortid';

import BookReducer from './bookReducer';
import BookContext from './bookContext';

import {
  LOADING,
  ERROR,
  LOAD_BOOK,
  CREATE_BOOK,
  LOAD_BOOK_CONDITION,
} from '../types';

import { db } from '../../firebase';

const BookState = (props) => {
  const initialState = {
    books: [],
    loading: null,
    error: null,
  };

  const [state, dispatch] = useReducer(BookReducer, initialState);

  const loadBookByCondition = async (category) => {
    try {
      const docs = await db.collection('books').get();

      let books;

      if (category === 'free') {
        books = docs.docs.filter((doc) => {
          return doc.data().price === 0;
        });
      } else {
        books = docs.docs.filter((doc) => {
          return doc.data().category === category;
        });
      }

      dispatch({
        type: LOAD_BOOK_CONDITION,
        payload: books,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: { error },
      });
    }
  };

  const loadBooks = async () => {
    try {
      const docs = await db.collection('books').get();

      const books = docs.docs.map((doc) => {
        return doc.data();
      });

      dispatch({
        type: LOAD_BOOK,
        payload: books,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: { error },
      });
    }
  };

  const createBook = async (data) => {
    try {
      setLoading();

      const id = shortid.generate();
      await db
        .collection('books')
        .doc(id)
        .set({
          ...data,
          id: id,
          timeStamps: new Date().getTime(),
        });

      console.log('Document successfully written!');

      dispatch({
        type: CREATE_BOOK,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: { error },
      });
    }
  };

  // const deleteArticle = async (id) => {
  //   try {
  //     setLoading();
  //     await db.collection('articles').doc(id).delete();
  //   } catch (error) {
  //     dispatch({
  //       type: ERROR,
  //       payload: { error },
  //     });
  //   }
  // };

  const setLoading = () => {
    dispatch({
      type: LOADING,
    });
  };

  return (
    <BookContext.Provider
      value={{
        books: state.books,
        setLoading,
        loadBooks,
        createBook,
        loadBookByCondition,
      }}>
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
