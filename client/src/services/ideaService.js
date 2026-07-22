import request from './request';

const baseUrl = 'http://localhost:3030/data/ideas';

export const getAll = () =>
    request(baseUrl);

export const getById = (ideaId) =>
    request(`${baseUrl}/${ideaId}`);

export const create = (ideaData) =>
    request(baseUrl, 'POST', ideaData);

export const update = (ideaId, ideaData) =>
    request(`${baseUrl}/${ideaId}`, 'PUT', ideaData);

export const remove = (ideaId) =>
    request(`${baseUrl}/${ideaId}`, 'DELETE');