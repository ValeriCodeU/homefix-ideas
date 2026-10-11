import request from './request';

// const baseUrl = 'http://localhost:3030/data/likes';

const baseUrl = 'http://127.0.0.1:5001/homefix-ideas-app/europe-west1/api/data/likes';

export const getByIdeaId = (ideaId) => {
    const where = encodeURIComponent(`ideaId="${ideaId}"`);

    return request(`${baseUrl}?where=${where}`);
}

export const create = (ideaId, accessToken) =>
    request(baseUrl, 'POST', { ideaId }, accessToken);

export const remove = (likeId, accessToken) =>
    request(`${baseUrl}/${likeId}`, 'DELETE', undefined, accessToken);
