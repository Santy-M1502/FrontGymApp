import { URL_BASE } from './constantes.js';

export async function fetchWithAuth(endpoint, options = {}) {
  const fetchOptions = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      'Authorization': `Bearer ${localStorage.getItem('accessToken') || ''}`
    },
    credentials: 'include'
  };
  let res = await fetch(`${URL_BASE}${endpoint}`, fetchOptions);
  if (res.status === 401) {
    const refreshRes = await fetch(`${URL_BASE}/auth/refresh`, {
      method: 'POST',
      credentials: 'include'
    });

    if (!refreshRes.ok) {
      window.location.href = '/html/login.html';
      return;
    }
    const refreshData = await refreshRes.json();
    localStorage.setItem('accessToken', refreshData.accessToken);

    fetchOptions.headers['Authorization'] = `Bearer ${refreshData.accessToken}`;
    res = await fetch(`${URL_BASE}${endpoint}`, fetchOptions);
  }

  try {
    return await res.json();
  } catch {
    return null;
  }
}
