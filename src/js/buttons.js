function createButtons() {
  const btnWrap = document.createElement('div');
  btnWrap.classList.add('btn-nav');
  btnWrap.style.opacity = '0';

  for (let i = 0; i < 5; i += 1) {
    const btn = document.createElement('div');
    btn.classList.add('btn-nav__btn');
    btnWrap.appendChild(btn);
    if (i === 2) {
      const indicatePage = document.createElement('div');
      indicatePage.classList.add('btn__indicate');
      btn.appendChild(indicatePage);
    }
  }

  document.body.appendChild(btnWrap);
}

function setNumPage() {
  const curNumPage = Math.ceil(-document.querySelector('.card-wrap').offsetLeft / document.querySelector('.slider').offsetWidth + 1);
  document.querySelector('.btn__indicate').innerHTML = curNumPage;
}

export { createButtons, setNumPage };
