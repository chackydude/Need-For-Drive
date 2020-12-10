import BaseApi from "./BaseApi";

export default class FetchApi extends BaseApi {
  headers = {
    "X-Api-Factory-Application-Id": process.env.VUE_APP_ID,
    Authorization: process.env.VUE_APP_SECRET_KEY,
    "Content-Type": "application/json"
  };

  async getRequest(url, headers) {
    return fetch(url, {
      headers: headers,
      // contentType: "application/json"
    }).then(response => {
      return response.json();
    });
  }

  postRequest(url, headers, body) {
    return fetch(url, {
      headers: headers,
      method: "POST",
      contentType: "application/json",
      body: JSON.stringify(body)
    }).then(response => {
      return response.json();
    });
  }

  putRequest(url, headers, body) {
    return fetch(url, {
      headers: headers,
      method: "PUT",
      contentType: "application/json",
      body: JSON.stringify(body)
    }).then(response => {
      return response.json();
    });
  }
}
