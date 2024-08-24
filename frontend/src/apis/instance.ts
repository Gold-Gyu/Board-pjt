import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type' : 'application/json',
    // 인증
    // 'Authorization' : `Bearer ${token}`
  }

})

export default instance