import { config } from '../config/config.js';
import { getAuthToken } from '../_helpers/isAuth.js';

const getAll = () => {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(config.getAllProperty, requestOptions).then(handleResponse);
};

const getSinglePost = (postId) => {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(config.getSinglePost + `/id/${postId}`, requestOptions).then(
    handleResponse
  );
};

const makeDetailedRequest = (
  page = 1,
  keyword = '',
  category = '',
  feature = ''
) => {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(
    config.getSinglePost +
      `/?page=${page}&keyword=${keyword}&category=${category}&feature=${feature}`,
    requestOptions
  ).then(handleResponse);
};

function createNewAd(
  title = '',
  price = '',
  location = '',
  description = '',
  category = '',
  feature = ''
) {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(
    config.addNewProperty +
      `title=${title}&price=$${price}&location=${location}&description=${description}&category=${category}&feature=${feature}`,
    requestOptions
  ).then((res) => res);
}

const handleResponse = (response) => {
  return response.text().then((res) => {
    const data = res && JSON.parse(res);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
};

export const propertyService = {
  getAll,
  getSinglePost,
  makeDetailedRequest,
  createNewAd,
};
