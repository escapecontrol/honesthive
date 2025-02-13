const baseURL = import.meta.env.VITE_API_BASE_URL;

const getHeaders = (token: string) => {
  const headers = new Headers({
    "Content-Type": 'application/json',
  });

  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  return headers;
};

const api = {
  get: async (endpoint: string, token: string) => {
    const response = await fetch(`${baseURL}${endpoint}`, {
      method: 'GET',
      headers: getHeaders(token),
      credentials: 'include',
    });
    return response.json();
  },

  post: async (endpoint: string, body: unknown, token: string) => {
    const response = await fetch(`${baseURL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(token),
      credentials: 'include',
      body: JSON.stringify(body),
    });
    return response.json();
  },

  put: async (endpoint: string, body: unknown, token: string) => {
    const response = await fetch(`${baseURL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(token),
      credentials: 'include',
      body: JSON.stringify(body),
    });
    return response.json();
  },

  delete: async (endpoint: string) => {
    const response = await fetch(`${baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(''),
      credentials: 'include',
    });
    return response.json();
  },
};

export default api;