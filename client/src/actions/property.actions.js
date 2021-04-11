import { propertyConstants } from '../_constants/property.constants.js';
import { propertyService } from '../_services/property.service.js';

function getAll() {
  return (dispatch) => {
    // dispatch(clear());
    dispatch(request());

    // fake latency for ux
    setTimeout(() => {
      propertyService.getAll().then(
        (data) => dispatch(success(data)),
        (error) => dispatch(failure(error.toString()))
      );
    }, 1000);
  };

  function request() {
    return { type: propertyConstants.FETCH };
  }
  function success(data) {
    return { type: propertyConstants.SUCCESS, data };
  }
  function failure(err) {
    return { type: propertyConstants.ERROR, err };
  }
  function clear() {
    return { type: propertyConstants.CLEAR };
  }
}

function getSinglePost(postId) {
  return (dispatch) => {
    dispatch(request());

    // fake latency for ux
    setTimeout(() => {
      propertyService.getSinglePost(postId).then(
        (data) => dispatch(success(data)),
        (error) => dispatch(failure(error.toString()))
      );
    }, 1000);
  };

  function request() {
    return { type: propertyConstants.SINGLE_POST_FETCH };
  }
  function success(data) {
    return { type: propertyConstants.SINGLE_POST_SUCCESS, data };
  }
  function failure(err) {
    return { type: propertyConstants.SINGLE_POST_ERROR, err };
  }
}

function makeDetailedRequest(
  page = 1,
  keyword = '',
  category = '',
  feature = ''
) {
  return (dispatch) => {
    // dispatch(clear());
    dispatch(request());

    // fake latency for ux
    setTimeout(() => {
      propertyService
        .makeDetailedRequest(page, keyword, category, feature)
        .then(
          (data) => dispatch(success(data)),
          (error) => dispatch(failure(error.toString()))
        );
    }, 1000);
  };

  function request() {
    return { type: propertyConstants.SEARCH_POST_FETCH };
  }
  function success(data) {
    return { type: propertyConstants.SEARCH_POST_SUCCESS, data };
  }
  function failure(err) {
    return { type: propertyConstants.SEARCH_POST_ERROR, err };
  }
  function clear() {
    return { type: propertyConstants.SEARCH_POST_CLEAR };
  }
}

export const propertyActions = {
  getAll,
  getSinglePost,
  makeDetailedRequest,
};
