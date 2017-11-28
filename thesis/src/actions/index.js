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
