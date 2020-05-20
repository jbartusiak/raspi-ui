import { EnableProvidersRequest, IEndpointSpec } from '../reducers/Types';
import { doPost } from './actuatorActions';
import { MODIFY_PROVIDERS_SUCCESS } from './actionTypes';

const setProvidersEnabled = (providers: { [name: string]: boolean }) => ({
    type: MODIFY_PROVIDERS_SUCCESS,
    providers,
});

export const modifyProviders = (
    { host, port, uri }: IEndpointSpec,
    request: EnableProvidersRequest
) => {
    return (dispatch: Function) => {
        const url = `${host}:${port}${uri}`;

        doPost(url, request)
            .then(response => {
                response.json();
            })
            .then();
    };
};
