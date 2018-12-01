import CreateCard from './cardInfoElem';
import Request from './request';
import { setNumPage } from './buttons';

function startRequest(nextPageToken) {
  const value = document.querySelector('.search').value;
  const properties = {
    maxResult: '16',
    q: value,
    typeRequest: 'search',
    order: 'relevance',
    type: 'video',
    pToken: nextPageToken,
  };

  let requestInfo = new Request();
  requestInfo = requestInfo.startRequest(properties);

  requestInfo.onload = () => {
    const data = JSON.parse(requestInfo.responseText);
    startRequest.pageToken = data.nextPageToken;

    let videosId = [];
    for (let i = 0; i < data.items.length; i += 1) {
      videosId.push(data.items[i].id.videoId);
    }

    videosId = videosId.join(',');

    const propStatistic = {
      id: videosId,
      typeRequest: 'videos',
    };

    let requestStatistic = new Request();
    requestStatistic = requestStatistic.startRequest(propStatistic);

    requestStatistic.onload = () => {
      const statisticsData = JSON.parse(requestStatistic.responseText);
      const fullInfoVideo = {};
      for (let i = 0; i < statisticsData.items.length; i += 1) {
        fullInfoVideo.bgImg = data.items[i].snippet.thumbnails.medium.url;
        fullInfoVideo.videoName = data.items[i].snippet.title;
        fullInfoVideo.channelTitle = data.items[i].snippet.channelTitle;
        fullInfoVideo.published = data.items[i].snippet.publishedAt.substr(0, 10);
        fullInfoVideo.description = data.items[i].snippet.description;

        if (statisticsData.items[i].id === data.items[i].id.videoId) {
          fullInfoVideo.id = data.items[i].id.videoId;
          fullInfoVideo.viewCount = statisticsData.items[i].statistics.viewCount;
        } else {
          fullInfoVideo.viewCount = 'Seen';
        }
        document.querySelector('.card-wrap').appendChild(new CreateCard(fullInfoVideo).buildCard());

        if (i === statisticsData.items.length - 1) {
          document.querySelector('.btn-nav').style.opacity = '1';
        }
      }
      setNumPage();
    };
  };
}

export default startRequest;
