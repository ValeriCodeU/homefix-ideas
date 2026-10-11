export default async function request(url, method, data, accessToken) {

    const options = {
        headers: {}
    };

    if (method) {
        options.method = method;
    }

    if (data !== undefined) {
        options.body = JSON.stringify(data);
        options.headers['content-type'] = 'application/json';
    }

    if (accessToken) {
        options.headers['X-Authorization'] = accessToken;
    }

    const response = await fetch(url, options);

    if (response.status === 204) {
        return {};
    }

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;
}