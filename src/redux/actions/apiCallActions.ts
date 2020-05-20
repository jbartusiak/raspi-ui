import { API_CALL_FAILED, BEGIN_API_CALL } from './actionTypes';

export const beginApiCall = (message?: string) => ({
    type: BEGIN_API_CALL,
    message,
});
export const apiCallFailed = (message?: string) => ({
    type: API_CALL_FAILED,
    message,
});
