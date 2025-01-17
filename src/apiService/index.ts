import store from '../store/store';
import {createApi} from '@reduxjs/toolkit/query';

// const BASE_URL = 'https://appswatt.com/alyms/public/api';
const BASE_URL = 'https://almysapp.com/alyms/public/api';

const APISERVICES = {
  forgot: createApiFunction('/forgetpassword'),
  estimate: createApiFunction('/estimate'),
  customer: createApiFunction('/customer'),
  delete: createApiFunction('/estimate'),
  makelist: createApiFunction('/make'),
  modelList: createApiFunction('/model'),
  companyType: createApiFunction('/const'),
  uploadPhoto: createApiFunction('/file'),
  team: createApiFunction('/team'),
  job: createApiFunction('/job'),
  convertJob: createApiFunction('/job/convertjob'),
  comment: createApiFunction('/comment'),
  const: createApiFunction('/const'),
  kk: createApiFunction('kk'),
};

export default APISERVICES;
store.subscribe(getToken);

function getToken() {
  return store?.getState()?.user?.token || '';
}


async function fetchData(
  url: string,
  method: string,
  data?: FormData | Record<string, any>,
) {
  const headers: Record<string, any> = {
    Authorization: 'Bearer ' + getToken(),
    'Access-Control-Allow-Origin': '*',
  };

  if (!(data instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const options = {
      method: method,
      headers,
      body: data ? createRequestBody(data) : undefined,
    };
    console.log(
      BASE_URL + replaceAndRemoveTrailingSlash(url),
      data ? createRequestBody(data) : undefined,
    );
    const response = await fetch(
      BASE_URL + replaceAndRemoveTrailingSlash(url),
      options,
    );
    let res = await response.json();
    if (!response.ok) {
      console.log(res, 'fetchData...');

      throw res;
    }
    return res;
  } catch (error) {
    // error handling here
    console.log(error, BASE_URL + replaceAndRemoveTrailingSlash(url));
    throw error;
  }
}

function createApiFunction(apiUrl: string) {
  return {
    get: (id?: string | number) => {
      const url = id ? `${apiUrl}/${id}` : apiUrl;
      return fetchData(url, 'GET');
    },
    post: (data: FormData | Record<string, any>, id: string = '') => {
      const url = id ? `${apiUrl}/${id}` : apiUrl;
      return fetchData(url, 'POST', data);
    },
    patch: (id: string | number, data: FormData | Record<string, any>) => {
      const url = id ? `${apiUrl}/${id}` : apiUrl;
      return fetchData(url, 'PATCH', data);
    },
    put: (id: string | number, data: FormData | Record<string, any>) => {
      const url = id ? `${apiUrl}/${id}` : apiUrl;
      return fetchData(url, 'PUT', data);
    },
    delete: (id: string | number) => {
      const url = id ? `${apiUrl}/${id}` : apiUrl;
      return fetchData(url, 'DELETE');
    },
  };
}

function createRequestBody(data: FormData | Record<string, any>) {
  return data instanceof FormData ? data : JSON.stringify(data);
}

function replaceAndRemoveTrailingSlash(url: string): String {
  const cleanedUrl = url.replace(/\/+/g, '/'); // Replace consecutive slashes with a single slash
  const withoutTrailingSlash = cleanedUrl.replace(/\/+$/, ''); // Remove trailing slashes

  const hasQuery = withoutTrailingSlash.includes('?');
  if (hasQuery) {
    const parts = withoutTrailingSlash.split('?');
    return replaceAndRemoveTrailingSlash(parts[0]) + '?' + parts[1];
  }

  return withoutTrailingSlash;
}
