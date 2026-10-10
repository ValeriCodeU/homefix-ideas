import request from './request';

const baseUrl = 'http://localhost:3030/data/likes';

export const getByIdeaId = (ideaId) => {
    const where = encodeURIComponent(`ideaId="${ideaId}"`);

    return request(`${baseUrl}?where=${where}`);
}

export const create = (ideaId, accessToken) =>
    request(baseUrl, 'POST', { ideaId }, accessToken);

export const remove = (likeId, accessToken) =>
    request(`${baseUrl}/${likeId}`, 'DELETE', undefined, accessToken);
