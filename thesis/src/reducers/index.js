import * as types from '../actions/types';

const defaultState = {
  UserInfo: {
    password1: null,
    password2: null,
    username: null,
    email: null,
  },
  UserImage: null,
  saveCompanyInfo: null,
}

export default (state = defaultState, action) => {
  switch (action.type) {
  case types.SAVE_COMPANY_INFO:
    return {
      ...state,
      saveCompanyInfo: action.data,
    }
  case types.CROPPED_USER_IMAGE:
    return {
      ...state,
      UserImage: action.image,
    }

  case types.SET_USER_EMAIL:
    return {
      ...state, UserInfo: {
        ...state.UserInfo,
        email: action.infoEmail,
      },
    }
  case types.SET_USER_PASSWORD1:
    return {
      ...state, UserInfo: {...state.UserInfo, password1: action.infoPass1,},
    }
  case types.SET_USER_PASSWORD2:
    return {
      ...state, UserInfo: {...state.UserInfo, password2: action.infoPass2,},
    }
  case types.SET_USER_USERNAME:
    return {
      ...state, UserInfo: {...state.UserInfo, username: action.infoUser,},
    }
  case types.CLEAR_EMAIL:
    return {
      ...state, UserInfo: {...state.UserInfo, email: '',},
    }
  case types.CLEAR_PASSWORD1:
    return {
      ...state, UserInfo: {...state.UserInfo, password1: '',},
    }
  case types.CLEAR_PASSWORD2:
    return {
      ...state, UserInfo: {...state.UserInfo, password2: '',},
    }
  default:
    return state;
  }
}
