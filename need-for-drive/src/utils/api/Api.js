export default class Api {
  constructor(provider) {
    this.provider = provider;
  }

  // templates, headers may be not required
  getRequest(url, headers) {
    return this.provider.getRequest(url, headers);
  }
  postRequest(url, headers, body) {
    return this.provider.postRequest(url, headers, body);
  }
  putRequest(url, headers, body) {
    return this.provider.putRequest(url, headers, body);
  }
  deleteRequest(url, headers) {
    return this.provider.deleteRequest(url, headers);
  }
}
