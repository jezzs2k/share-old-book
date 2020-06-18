import {
  LOADING,
  ERROR,
  LOAD_BOOK,
  CREATE_BOOK,
  LOAD_BOOK_CONDITION,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case LOAD_BOOK_CONDITION:
      return {
        ...state,
        books: action.payload.map((item) => item.data()),
        loading: false,
      };
    case LOAD_BOOK:
      return {
        ...state,
        books: action.payload,
        loading: false,
      };
    case CREATE_BOOK:
      return {
        ...state,
        loading: false,
      };

    case ERROR:
      return {
        ...state,
        books: null,
        loading: false,
        error: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return { ...state };
  }
};
