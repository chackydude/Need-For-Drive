import BaseApi from "./BaseApi";
import { instance } from "./instance";

export default class AxiosApi extends BaseApi {
  async getRequest(url) {
    return await instance
      .get(url)
      .then(response => {
        return response.data;
      })
      .catch(err => {
        if (err.response) {
          console.error("Oh, we get an error response (5xx, 4xx)");
        } else if (err.request) {
          console.error(
            "Some troubles with a network, pls check your connection"
          );
        } else {
          console.error("Something went wrong, pls refresh the page");
        }
      });
  }

  async postRequest(url, body) {
    return await instance
      .post(url, body)
      .then(response => {
        return response.data;
      })
      .catch(err => {
        if (err.response) {
          console.error("Oh, we get an error response (5xx, 4xx)");
        } else if (err.request) {
          console.error(
            "Some troubles with a network, pls check your connection"
          );
        } else {
          console.error("Something went wrong, pls refresh the page");
        }
      });
  }

  async putRequest(url, body) {
    return await instance
      .put(url, body)
      .then(response => {
        return response.data;
      })
      .catch(err => {
        if (err.response) {
          console.error("Oh, we get an error response (5xx, 4xx)");
        } else if (err.request) {
          console.error(
            "Some troubles with a network, pls check your connection"
          );
        } else {
          console.error("Something went wrong, pls refresh the page");
        }
      });
  }
}
