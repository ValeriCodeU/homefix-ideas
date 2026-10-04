import request from './request';

const baseUrl = 'http://localhost:3030/data/comments';

export const getByIdeaId = (ideaId) => {
    const where = encodeURIComponent(`ideaId="${ideaId}"`);
    const load = encodeURIComponent('author=_ownerId:users');
    const sortBy = encodeURIComponent('_createdOn desc');

    return request(`${baseUrl}?where=${where}&load=${load}&sortBy=${sortBy}`);
}

export const create = (ideaId, text, accessToken) =>
    request(baseUrl, 'POST', { ideaId, text }, accessToken);
