export default class Api {
  constructor(provider) {
    this.provider = provider;
  }

  getRequest(url, headers) {
    return this.provider.getRequest(url, headers);
  }
  postRequest(url, headers, body) {
    return this.provider.postRequest(url, headers, body);
  }
  updateRequest(url, headers, body) {
    return this.provider.updateRequest(url, headers, body);
  }
  deleteRequest(url, headers) {
    return this.provider.deleteRequest(url, headers);
  }
}
