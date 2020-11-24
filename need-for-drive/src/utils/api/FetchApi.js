import BaseApi from "./BaseApi";

export default class FetchApi extends BaseApi {
  headers = {
    "X-Api-Factory-Application-Id": process.env.VUE_APP_ID,
    Authorization: process.env.VUE_APP_SECRET_KEY
  };

  getRequest(url, headers) {
    return fetch(url, {
      headers: headers,
      contentType: "application/json"
    }).then(response => {
      return response.json();
    });
  }
}
