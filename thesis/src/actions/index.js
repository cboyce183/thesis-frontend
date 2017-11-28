import * as types from './types'


export const saveCompanyInfo = (data) => {
  return {
    type: types.SAVE_COMPANY_INFO,
    data,
  }
};

export const doneCroppedImage = (Cimage) => {
  console.log('t action working')
  return {
    type: types.CROPPED_USER_IMAGE,
    image: Cimage,
  }
};

// export const saveUserInfoToState = (userInfo) => {
//   console.log('tdvcgavdiakvacks... action working')
//   return {
//     type: types.SAVE_USER_INFO_TO_STATE ,
//     infoUser: userInfo,
//   }
// };
export const Email = (dt) => {
  console.log('tdvcgavdiakvacks... action working')
  return {
    type: types.SET_USER_EMAIL ,
    infoEmail: dt,
  }
};
export const UserName = (dt) => {
  console.log('tdvcgavdiakvacks... action working')
  return {
    type: types.SET_USER_USERNAME,
    infoUser: dt,
  }
};
export const Password2= (dt2) => {
  console.log('tdvcgavdiakvacks... action working')
  return {
    type: types.SET_USER_PASSWORD2,
    infoPass2: dt2,
  }
};
export const Password1 = (dt1) => {
  console.log('tdvcgavdiakvacks... action working')
  return {
    type: types.SET_USER_PASSWORD1,
    infoPass1: dt1,
  }
};

export const ClearEmail = () =>{
  console.log("clearemial action ")
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
