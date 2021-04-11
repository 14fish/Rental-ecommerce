import { detailedSearch } from "../_constants/detailedSearch.constants.js";

const initialState = {
  page: 1,
  keyword: "",
  feature: "",
  category: "",
};

export const detailedSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case detailedSearch.PAGE:
      return {
        ...state,
        page: action.data,
      };
    case detailedSearch.KEYWORD:
      return {
        ...state,
        keyword: action.data,
      };
    case detailedSearch.FEATURE:
      return {
        ...state,
        feature: action.data,
      };
    case detailedSearch.CATEGORY:
      return {
        ...state,
        category: action.data,
      };
    case detailedSearch.CLEAR:
      return {
        page: 1,
        keyword: "",
        feature: "",
        category: "",
      };

    default:
      return state;
  }
};
