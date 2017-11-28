import * as types from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case types.SAVE_COMPANY_INFO:
      return [
        ...state,
        action.data
      ]
    default:
      return state;
  }
}
