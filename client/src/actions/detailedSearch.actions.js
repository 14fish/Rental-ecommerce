import { detailedSearch } from "../_constants/detailedSearch.constants.js";

const getKeyword = (data) => {
  return (dispatch) => {
    dispatch({ type: detailedSearch.KEYWORD, data });
  };
};

const getCategory = (data) => {
  return (dispatch) => {
    dispatch({ type: detailedSearch.CATEGORY, data });
  };
};

const getFeature = (data) => {
  return (dispatch) => {
    dispatch({ type: detailedSearch.FEATURE, data });
  };
};

const getPage = (data) => {
  return (dispatch) => {
    dispatch({ type: detailedSearch.PAGE, data });
  };
};

export const detailedSearchActions = {
  getKeyword,
  getCategory,
  getFeature,
  getPage,
};
