import {api} from './configs/fetchConfigs';

export const get = async function(path: string) {
	const response = await fetch(api.baseURL + path, {'method': 'GET', 'mode': 'cors'});
	return await response.json();
};
