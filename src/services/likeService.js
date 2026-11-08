import request from './request';
import { addLikesCount } from '../utils/ideaQuery.js';

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
const baseUrl = `${SERVER_URL}/data/likes`;

const getAllIdeaIds = () =>
    request(`${baseUrl}?select=ideaId`);

// Получава вече стартираната заявка за идеите, а не резултата ѝ, за да вървят двете заявки едновременно
export const withLikesCount = async (ideasRequest) => {
    const [ideas, likes] = await Promise.all([ideasRequest, getAllIdeaIds()]);

    return addLikesCount(ideas, likes);
};

export const getByIdeaId = (ideaId) => {
    const where = encodeURIComponent(`ideaId="${ideaId}"`);

    return request(`${baseUrl}?where=${where}`);
};

export const getByOwnerId = (ownerId) => {
    const where = encodeURIComponent(`_ownerId="${ownerId}"`);
    const sortBy = encodeURIComponent('_createdOn desc');

    return request(`${baseUrl}?where=${where}&sortBy=${sortBy}`);
};

export const create = (ideaId, accessToken) =>
    request(baseUrl, 'POST', { ideaId }, accessToken);

export const remove = (likeId, accessToken) =>
    request(`${baseUrl}/${likeId}`, 'DELETE', undefined, accessToken);
