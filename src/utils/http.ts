import axios, { AxiosPromise, AxiosRequestConfig } from "axios";

export interface HttpRequestConfig {
  url: string;
  username: string;
  password: string;
}

export interface HttpResponse<T> {
  status: number;
  data: T;
}

export class HttpClient {
  constructor() { /* */ }

  public async get<T>(requestConfig: HttpRequestConfig): Promise<HttpResponse<T>> {
    const axiosConfig: AxiosRequestConfig = {
      auth: {
        password: requestConfig.password,
        username: requestConfig.username,
      },
      method: "GET",
      responseType: "json",
      url: requestConfig.url,
      validateStatus: () => true,
    };
    const response = await this.request(axiosConfig);

    // if (response.status !== 200) {
    //   throw new Error(`Received status ${response.status} from ${requestConfig.url}`);
    // }

    return {
      data: response.data as T,
      status: response.status,
    };
  }

  // public async post<T, K>(url: string, data: T, requestConfig: HttpRequestConfig): Promise<K> {

  // }

  private request<T>(requestConfig: AxiosRequestConfig): AxiosPromise<T> {
    return axios.request(requestConfig);
  }
}
