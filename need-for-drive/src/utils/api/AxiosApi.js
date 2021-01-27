import BaseApi from "./BaseApi";
import { instance } from "./instance";

export default class AxiosApi extends BaseApi {
  async getRequest(url) {
    let response = await instance
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
    return response;
  }

  async postRequest(url, body) {
    let response = await instance
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
    return response;
  }

  async putRequest(url, body) {
    let response = await instance
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
    return response;
  }

  async deleteRequest(url) {
    let response = await instance
      .delete(url)
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
    return response;
  }
}
