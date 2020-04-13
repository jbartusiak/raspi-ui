import { API_CALL_FAILED, BEGIN_API_CALL } from './actionTypes';

export const beginApiCall = () => ({type: BEGIN_API_CALL});
export const apiCallFailed = () => ({type: API_CALL_FAILED});