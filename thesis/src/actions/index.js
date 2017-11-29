import * as types from './types'


export const saveCompanyInfo = (data) => {
  return {
    type: types.SAVE_COMPANY_INFO,
    data,
  }
};

export const doneCroppedImage = (Cimage) => {
  return {
    type: types.CROPPED_USER_IMAGE,
    image: Cimage,
  }
};

export const Email = (dt) => {
  return {
    type: types.SET_USER_EMAIL ,
    infoEmail: dt,
  }
};
export const UserName = (dt) => {
  return {
    type: types.SET_USER_USERNAME,
    infoUser: dt,
  }
};
export const Password2= (dt2) => {
  return {
    type: types.SET_USER_PASSWORD2,
    infoPass2: dt2,
  }
};
export const Password1 = (dt1) => {
  return {
    type: types.SET_USER_PASSWORD1,
    infoPass1: dt1,
  }
};

export const ClearEmail = () =>{
  return {
    type: types.CLEAR_EMAIL,
  }
}


export const ClearPassword1 = () =>{
  return {
    type: types.CLEAR_PASSWORD1,
  }
}
export const ClearPassword2 = () =>{
  return {
    type: types.CLEAR_PASSWORD2,
  }
}
