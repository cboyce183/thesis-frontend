import * as types from './types'


export const saveCompanyInfo = (data) => {
  return {
    type: types.SAVE_COMPANY_INFO,
    data,
  }
};
