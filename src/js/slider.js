import { setNumPage } from './buttons';
import startRequest from './send_request';

function createSlider() {
  const wrap = document.querySelector('.slider');
  const container = document.querySelector('.card-wrap');
  const body = document.body;
  let shiftX;
  let leftWrap;
  let startPositionMouse;
  let styleLeftPosition;
  createSlider.leftPosition = 0;

  function getCoords(elem) {
    const box = elem.getBoundingClientRect();
    return {
      left: box.left,
    };
  }

  function changeElemPosition(eX) {
    const wrapWidth = wrap.offsetWidth;
    const valueLeftPosition = parseFloat(container.style.left);

    if (-(container.offsetWidth - wrap.offsetWidth) > container.offsetLeft) {
      createSlider.leftPosition = -(container.offsetWidth - wrap.offsetWidth);
    } else {
      // eslint-disable-next-line no-lonely-if
      if (wrapWidth === 1440) {
        if ((valueLeftPosition > -150
          && valueLeftPosition < -10
          && createSlider.leftPosition === -360)
          || (valueLeftPosition > -20
            && valueLeftPosition < -10
            && createSlider.leftPosition === -720)
          || (valueLeftPosition > -120
            && valueLeftPosition < -100
            && createSlider.leftPosition === -1440)) {
          createSlider.leftPosition = 0;
        } else {
          // eslint-disable-next-line no-lonely-if
          if ((eX - startPositionMouse) < -200) {
            createSlider.leftPosition -= 1440;
          } else if ((eX - startPositionMouse) > 200) {
            createSlider.leftPosition += 1440;
          } else {
            return;
          }
        }
      } else if (wrapWidth === 720) {
        if (valueLeftPosition > -20
          && valueLeftPosition < -10
          && createSlider.leftPosition === -360) {
          createSlider.leftPosition = 0;
        } else {
          // eslint-disable-next-line no-lonely-if
          if ((eX - startPositionMouse) < -80) {
            createSlider.leftPosition -= 720;
          } else if ((eX - startPositionMouse) > 80) {
            createSlider.leftPosition += 720;
          } else {
            return;
          }
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if ((eX - startPositionMouse) < -80) {
          createSlider.leftPosition -= 360;
        } else if ((eX - startPositionMouse) > 80) {
          createSlider.leftPosition += 360;
        } else {
          return;
        }
      }
    }
    container.style.left = `${createSlider.leftPosition}px`;

    // eslint-disable-next-line no-use-before-define
    body.removeEventListener('mousemove', move);
    // eslint-disable-next-line no-use-before-define
    body.removeEventListener('mouseup', changeListeners);
    // eslint-disable-next-line no-use-before-define
    body.removeEventListener('mouseleave', mouseLeave);

    // eslint-disable-next-line no-use-before-define
    body.removeEventListener('touchmove', move);
    // eslint-disable-next-line no-use-before-define
    body.removeEventListener('touchend', changeListeners);
    // eslint-disable-next-line no-use-before-define
    body.removeEventListener('touchleave', mouseLeave);

    if (parseFloat(container.style.left) > 0) {
      createSlider.leftPosition = 0;
      container.style.left = `${0}px`;
    }
    setTimeout(setNumPage, 500);
    if ((document.querySelector('.card-wrap').offsetWidth
      + document.querySelector('.card-wrap').offsetLeft)
      <= (document.querySelector('.slider').offsetWidth * 3)) {
      startRequest(startRequest.pageToken);
    }
  }

  function move(event) {
    const eX = event.pageX || event.changedTouches[0].pageX;
    if (parseFloat(container.style.left) >= 10) {
      container.style.left = `${10}px`;
    } else {
      container.style.left = `${eX - (shiftX + leftWrap)}px`;
      changeElemPosition(eX);
    }
  }

  function mouseLeave() {
    body.removeEventListener('mousemove', move);
    // eslint-disable-next-line no-use-before-define
    body.removeEventListener('mouseup', changeListeners);
    body.removeEventListener('touchmove', move);
    // eslint-disable-next-line no-use-before-define
    body.removeEventListener('touchend', changeListeners);
    container.style.left = styleLeftPosition;
  }

  function changeListeners() {
    container.style.left = styleLeftPosition;
    body.removeEventListener('mousemove', move);
    body.removeEventListener('mouseleave', mouseLeave);

    body.removeEventListener('touchmove', move);
    body.removeEventListener('touchleave', mouseLeave);
  }

  container.addEventListener('mousedown', (e) => {
    leftWrap = getCoords(wrap).left;
    shiftX = e.pageX - getCoords(container).left;
    startPositionMouse = e.pageX;
    styleLeftPosition = container.style.left;
    body.addEventListener('mousemove', move);
    body.addEventListener('mouseup', changeListeners);
    body.addEventListener('mouseleave', mouseLeave);
  });

  container.addEventListener('touchstart', (e) => {
    leftWrap = getCoords(wrap).left;
    shiftX = e.pageX - getCoords(container).left;
    startPositionMouse = e.changedTouches[0].pageX;
    styleLeftPosition = container.style.left;
    body.addEventListener('touchmove', move);
    body.addEventListener('touchend', changeListeners);
    body.addEventListener('touchleave', mouseLeave);
  });
  window.addEventListener('resize', setNumPage);
}

export default createSlider;
