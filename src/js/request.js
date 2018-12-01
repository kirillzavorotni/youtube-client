class RequestParent {
  constructor(xhr) {
    this.xhr = xhr;
    this.apiKey = 'AIzaSyDu3RDVh9E70T05r5sL57juaogYiyuGymA';
    this.method = 'GET';
    this.url = 'googleapis.com/youtube/v3/';
  }

  start(prop) {
    if (prop.q && prop.pToken) {
      this.xhr.open(this.method, `https://www.${this.url}${prop.typeRequest}?part=snippet&maxResults=${prop.maxResult}&order=${prop.order}&pageToken=${prop.pToken}&q=${prop.q}&type=${prop.type}&fields=items(id%2FvideoId%2Csnippet(channelTitle%2Cdescription%2CpublishedAt%2Cthumbnails%2Fmedium%2Furl%2Ctitle))%2CnextPageToken&key=${this.apiKey}`);
    } else if (prop.q) {
      this.xhr.open(this.method, `https://www.${this.url}${prop.typeRequest}?part=snippet&maxResults=${prop.maxResult}&order=${prop.order}&q=${prop.q}&type=${prop.type}&fields=items(id%2FvideoId%2Csnippet(channelTitle%2Cdescription%2CpublishedAt%2Cthumbnails%2Fmedium%2Furl%2Ctitle))%2CnextPageToken&key=${this.apiKey}`);
    } else {
      this.xhr.open(this.method, `https://www.${this.url}${prop.typeRequest}?part=snippet%2CcontentDetails%2Cstatistics&id=${prop.id}&fields=items(id%2Cstatistics%2FviewCount)&key=${this.apiKey}`);
    }
  }

  push() {
    this.xhr.send();
  }
}

class Request extends RequestParent {
  constructor() {
    const xhr = new XMLHttpRequest();
    super(xhr);
  }

  startRequest(prop) {
    this.start(prop);
    this.push();
    return this.xhr;
  }
}

export default Request;
