import request from './request';

const baseUrl = 'http://localhost:3030/data/ideas';

export const getAll = (query) =>{
    if (query) {
        return request(`${baseUrl}?${query}`);
    }
    return request(baseUrl);
}

export const getById = (ideaId) =>
    request(`${baseUrl}/${ideaId}`);

export const create = (ideaData, accessToken) =>
    request(baseUrl, 'POST', ideaData, accessToken);

export const update = (ideaId, ideaData) =>
    request(`${baseUrl}/${ideaId}`, 'PUT', ideaData);

export const remove = (ideaId, accessToken) =>
    request(`${baseUrl}/${ideaId}`, 'DELETE', undefined, accessToken);