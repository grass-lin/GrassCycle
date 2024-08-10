import axios from "axios";

export const baseURL = "http://127.0.0.1:7001";
export const imageURL = `${baseURL}/images?imageName=`;

class HttpRequest {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  getInsideConfig() {
    const config = {
      baseURL: this.baseURL,
      headers: {},
    };
    return config;
  }

  setInterceptors(instance) {
    instance.interceptors.request.use(
      function (config) {
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        console.log(error);
        return Promise.reject(error);
      }
    );
  }

  request(options) {
    const instance = axios.create();
    options = { ...this.getInsideConfig(), ...options };
    this.setInterceptors(instance);
    return instance(options);
  }
}

export default new HttpRequest(baseURL);
