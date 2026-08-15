import request from './request';

const baseUrl = 'http://localhost:3030/users';

export const register = (email, password) =>
    request(`${baseUrl}/register`, 'POST', { email, password });

export const login = (email, password) =>
    request(`${baseUrl}/login`, 'POST', { email, password });

export const logout = (accessToken) =>
    request(`${baseUrl}/logout`, 'GET', undefined, accessToken);
