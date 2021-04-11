import { Tune } from '@material-ui/icons';
import { propertyConstants } from '../_constants/property.constants.js';

let initialState = {
  loading: false,
  properties: [],
  error: '',
  singlePost: {
    loading: true,
    data: {},
    error: '',
  },
};

export const property = (state = initialState, action) => {
  switch (action.type) {
    case propertyConstants.FETCH:
      return {
        ...state,
        loading: true,
      };
    case propertyConstants.SUCCESS:
      return {
        ...state,
        loading: false,
        properties: action.data,
      };
    case propertyConstants.ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case propertyConstants.SEARCH_POST_FETCH:
      return {
        ...state,
        loading: true,
      };
    case propertyConstants.SEARCH_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        properties: action.data,
      };
    case propertyConstants.SINGLE_POST_ERROR:
      return {
        ...state,
        singlePost: {
          ...state.singlePost,
          loading: false,
          error: action.error,
        },
      };
    case propertyConstants.SINGLE_POST_FETCH:
      return {
        ...state,
        singlePost: {
          loading: true,
          data: {},
          error: '',
        },
      };
    case propertyConstants.SINGLE_POST_SUCCESS:
      return {
        ...state,
        singlePost: {
          loading: false,
          data: action.data,
          error: '',
        },
      };

    default:
      return state;
  }
};
