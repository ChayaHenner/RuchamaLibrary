import axios from 'axios'

const { VITE_SERVER_URL = "", VITE_SERVER_TIMEOUT = ""} = import.meta.env

export const Api = axios.create({
  baseURL: VITE_SERVER_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: Number(VITE_SERVER_TIMEOUT),
})
