class cardTemplate {
  constructor(card, data) {
    this.card = card;
    this.innerCard = `
      <header class="card__header" style="background-image: url(${data.bgImg})">
        <h3 class="card__video-name name-video">
          <a href="https://youtu.be/${data.id}" class="name-video__link" target="_blank">
            <span class="name-video__text">${data.videoName}</span>
          </a>
        </h3> 
      </header>
  
      <section class="card__main-info main-inf">
        <p class="main-inf__channel-title">${data.channelTitle}</p>
        <p class="main-inf__date">${data.published}</p>
        <p class="main-inf__views">${data.viewCount}</p>
      </section>
  
      <footer class="card__footer">
        <p class="card__descr-video">${data.description}</p>
      </footer>
    `;
  }

  buildCard() {
    this.card.setAttribute('class', 'card');
    this.card.innerHTML = this.innerCard;
    return this.card;
  }
}

class CreateCard extends cardTemplate {
  constructor(data) {
    const card = document.createElement('div');
    super(card, data);
  }
}

export default CreateCard;
