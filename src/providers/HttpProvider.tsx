import axios from 'axios';
import { Alert } from 'react-native';

const get = (url: string, params = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, params)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const post = (url: string, data: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then((response) => resolve(response.data))
      .catch((error) => {
        Alert.alert('error', JSON.stringify(error));
        let exception = Object.assign(error);
        exception.data = data;
        reject(exception);
      });
  });
};

const put = (url: string, data: any) => {
  return new Promise((resolve, reject) => {
    axios
      .put(url, data)
      .then((response) => resolve(response.data))
      .catch((error) => {
        let exception = Object.assign(error);
        exception.data = data;
        reject(exception);
      });
  });
};

const patch = (url: string, data: any) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(url, data)
      .then((response) => resolve(response.data))
      .catch((error) => {
        let exception = Object.assign(error);
        exception.data = data;
        reject(exception);
      });
  });
};

const deleted = (
  url: string,
  data: import('axios').AxiosRequestConfig | undefined,
) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, data)
      .then((response) => resolve(response.data))
      .catch((error) => {
        let exception = Object.assign(error);
        exception.data = data;
        reject(exception);
      });
  });
};

const setDefaultHeaders = () => {
  axios.defaults.baseURL = 'http://192.168.0.3:8888/';
  // axios.defaults.timeout = 2500;
  axios.defaults.headers.common['Authorization'] = '';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.common['language'] = 'es';
};

/**
 * * Setea el token de forma global para todas las peticiones http
 */
const setHeaderToken = (token: any) => {
  //TODO por hacer la autorización con keyloack luego
  axios.defaults.headers.common['Authorization'] = token;
};

/**
 * * Setea la URL base de forma global para todas las peticiones http
 * para cambiar la url si se desea manual
 */
const setHeaderBaseURL = (URL: string | undefined) => {
  axios.defaults.baseURL = URL;
};

export default {
  get,
  post,
  put,
  patch,
  deleted,
  setDefaultHeaders,
  setHeaderToken,
  setHeaderBaseURL,
};
