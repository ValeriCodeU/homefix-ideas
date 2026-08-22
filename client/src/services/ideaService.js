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

export const create = (ideaData, token) =>
    request(baseUrl, 'POST', ideaData, token);

export const update = (ideaId, ideaData) =>
    request(`${baseUrl}/${ideaId}`, 'PUT', ideaData);

export const remove = (ideaId) =>
    request(`${baseUrl}/${ideaId}`, 'DELETE');