import * as types from '../actions/types';

const defaultState = {
  saveCompanyInfo: null,
}

export default (state = defaultState, action) => {
  switch (action.type) {
  case types.SAVE_COMPANY_INFO:
    return {
      ...state,
      saveCompanyInfo: action.data,
    }
  default:
    return state;
  }
}
