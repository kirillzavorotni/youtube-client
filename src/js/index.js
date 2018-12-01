import '../scss/base.scss';
import inputElem from './input_elem';
import startRequest from './send_request';
import createSlider from './slider';
import { createButtons } from './buttons';

window.onload = function loaded() {
  document.body.appendChild(inputElem);
  const slider = document.createElement('div');
  slider.classList.add('slider');
  const wrapForCards = document.createElement('div');
  wrapForCards.classList.add('card-wrap');
  slider.setAttribute('onmousedown', 'return false');
  slider.setAttribute('onselectstart', 'return false');
  wrapForCards.style.cursor = 'pointer';
  slider.appendChild(wrapForCards);
  document.body.appendChild(slider);
  const buttonSearch = document.querySelector('.button-search');
  const cardWrap = document.querySelector('.card-wrap');
  const input = document.querySelector('.search');
  const keyCodeIgnore = [
    9, 16, 17, 18, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 44, 45, 46, 80, 91, 173, 174, 175,
  ];

  let timer;

  function focusOn() {
    this.classList.remove('focus-off');
    this.classList.add('focus-on');
  }

  function focusOff() {
    this.classList.remove('focus-on');
    this.classList.add('focus-off');
  }

  function makeRequest() {
    startRequest.pageToken = '';
    cardWrap.innerHTML = '';
    createSlider.leftPosition = 0;
    wrapForCards.style.left = `${0}px`;
    startRequest();
  }

  input.addEventListener('focus', focusOn);
  input.addEventListener('blur', focusOff);

  input.addEventListener('keyup', (e) => {
    if (keyCodeIgnore.indexOf(e.keyCode) === -1) {
      clearTimeout(timer);
      if (!input.value) {
        startRequest.pageToken = '';
        cardWrap.innerHTML = '';
        createSlider.leftPosition = 0;
        wrapForCards.style.left = `${0}px`;
        document.querySelector('.btn-nav').style.opacity = '0';
      } else {
        timer = setTimeout(makeRequest, 1000);
      }
    }
  });

  input.addEventListener('keydown', () => {
    clearTimeout(timer);
  });

  buttonSearch.addEventListener('click', () => {
    startRequest(startRequest.pageToken);
  });
  createSlider();
  createButtons();
};
