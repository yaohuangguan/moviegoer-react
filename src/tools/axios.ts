import { useState, useEffect, useRef } from 'react';
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
  Canceler,
} from 'axios';
import { message } from 'antd'

interface useAxiosConfig extends AxiosRequestConfig {
  cancelable?: boolean;
}

interface useAxiosReturnObj<T = any> {
  response?: any;
  loading: boolean;
  error: string;
  cancelFn?: Canceler;
  refetchFn: (params?: any) => void;
}

// 表示元组具有一个可选的 boolean 类型数组项和随后任意多个任意类型元素
type useAxiosDeps = [boolean?, ...any[]];


const isPlainObject = (val: any): val is Object => {
  return !!val && typeof val === 'object' && val.constructor === Object;
};

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://nextbananaboom.herokuapp.com"
    : "https://nextbananaboom.herokuapp.com";

axios.defaults.timeout = 20000;
axios.defaults.baseURL = baseURL;

axios.interceptors.request.use(
  (config) => {
    axios.defaults.headers.common["X-XSS-Protection"] = 1;
    axios.defaults.headers.common["X-Content-Type-Options"] = "nosniff";
    axios.defaults.headers.common["Referrer-Policy"] = "same-origin";
    axios.defaults.headers.common["X-Frame-Options"] = "Deny";

    return config;
  },

  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, statusText, data } = error.response;
      // @TODO:  兼容后台
      const wrapupError = `Code ${status}:  ${statusText}`;
      switch (error.response.status) {
        case 401:
          throw wrapupError;
        case 400:
          throw wrapupError;
        case 403:
          throw wrapupError;
        case 404:
          throw wrapupError;
      };

      return Promise.reject(error.response);
    }
  }
);

/**
 * @template T 请求结果类型定义
 * @param { useAxiosConfig } config 请求配置，继承了 axios 的请求配置对象
 * @param { boolean } config.cancelable 是否需要取消请求的功能，设置为true时，外部可接收一个cancelFn方法对请求进行取消
 * @param { useAxiosDeps } deps 依赖项数组
 * @param { boolean } deps[0] 数组第一项为是否发起初始化请求
 * @return { useAxiosReturnObj } 返回值
 */


export const useAxios = <T = any>(
  config: useAxiosConfig,
  deps: useAxiosDeps
): useAxiosReturnObj<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<AxiosResponse<T>>();
  const [error, setError] = useState<string>("");
  const { cancelable = true, ...axiosConfig } = config;

  const cancelRef = useRef<CancelTokenSource>();

  if (cancelable) {
    cancelRef.current = axios.CancelToken.source();
  }

  const fetch = (params?: any) => {
    if (!isPlainObject(params)) {
      params = {};
    }
    setLoading(true);
    axios
      .request<T>({
        ...axiosConfig,
        data: { ...axiosConfig.data, ...params },
        cancelToken: cancelRef.current?.token,
      })
      .then((res) => setResponse(res))
      .catch((err) => {
        setError(err);
        message.error(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const [initialRequest = true] = deps;
    if (initialRequest) {
      fetch();
    }
  }, deps);

  useEffect(() => {
    return () => cancelRef.current?.cancel();
  }, []);

  const returnValues: useAxiosReturnObj = {
    response: response ? response.data : {},
    loading,
    error,
    refetchFn: fetch,
  };

  if (cancelable) {
    returnValues.cancelFn = cancelRef.current?.cancel;
  }

  return returnValues;
};


export const Api = async (params: useAxiosConfig) => {
  const source = axios.CancelToken.source();

  return axios({ ...params, cancelToken: source.token })
    // 直接处理掉其他信息 如果成功的话
    .then(rsp => rsp.data)
    // 如果失败先暂时 要error的信息
    .catch(err => Promise.reject(err))
}