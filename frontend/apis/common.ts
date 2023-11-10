import {api} from './configs/fetchConfigs';

export interface Error {
	msg: string,
}

export const get = async function(path: string) {
	const response = await fetch(api.baseURL + path, {
		'method': 'GET',
		'mode': 'cors',
		'credentials':'include',
	});
	return await response.json();
};

export const post = async function(path: string, data?: object) {
	const response = await fetch(api.baseURL + path, {
		'method': 'POST',
		'mode': 'cors',
		'credentials':'include',
		'headers': {
			'Content-Type': 'application/json',
		},
		'body':JSON.stringify(data)});
	if (!response.ok) {
		throw new Error('HTTP status ' + response.status);
	} else {
		return response.json();
	}
};
