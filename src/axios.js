import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.football-data.org/v2',
    headers: {'X-Auth-Token': 'c6af1b23a3504b589751fca8db716cc4'}
  });

  export default axiosInstance;