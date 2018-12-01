function createInputElem() {
  const inputElem = document.createElement('input');
  inputElem.setAttribute('type', 'text');
  inputElem.setAttribute('name', 'search-elems');
  inputElem.setAttribute('id', 'input-id');
  inputElem.setAttribute('placeholder', 'Find YouTube video here');
  inputElem.classList.add('search', 'focus-off');
  return inputElem;
}

function createInputWrap() {
  const inputWrap = document.createElement('div');
  const div = document.createElement('div');
  inputWrap.setAttribute('class', 'input-wrapp');
  div.setAttribute('class', 'button-search');
  inputWrap.appendChild(div);
  inputWrap.appendChild(createInputElem());
  return inputWrap;
}

export default createInputWrap();
