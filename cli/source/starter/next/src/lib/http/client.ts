import axios from 'axios';

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || '/api',
  timeout: 5000,
  headers: { Accept: 'application/json' },
});
