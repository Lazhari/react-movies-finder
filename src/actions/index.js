import axios from 'axios'

export const client = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'fed69657ba4cc6e1078d2a6a95f51c8c',
    language: 'en-US',
  },
})
