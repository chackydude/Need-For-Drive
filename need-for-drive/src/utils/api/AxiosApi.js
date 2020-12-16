import BaseApi from "./BaseApi";
import axios from "axios";

export default class AxiosApi extends BaseApi {
  headers = {
    "X-Api-Factory-Application-Id": process.env.VUE_APP_ID,
    Authorization: process.env.VUE_APP_SECRET_KEY,
    "Content-Type": "application/json"
  };

  async getRequest(url, headers) {
    return await axios
      .get(url, { headers: headers })
      .then(response => {
        return response.json();
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

  async postRequest(url, headers, body) {
    return await axios
      .post(url, body, { headers: headers })
      .then(response => {
        return response.json();
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

  async putRequest(url, headers, body) {
    return await axios
      .put(url, body, { headers: headers })
      .then(response => {
        return response.json();
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
