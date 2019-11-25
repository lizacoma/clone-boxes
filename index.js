let CURRENT_DIV = null;

let X = 0;
let Y = 0;

let getR = function() {
  return Math.round(Math.random() * 400);
};

let newElement = function(event) {
  let clone = event.target.cloneNode(true);
  const {top} = event.target.getBoundingClientRect();
  clone.style.top = `${top + 100}px`;
  clone.style.backgroundColor = 'red';
  document.querySelector('body').appendChild(clone);
  addEventsToDiv(clone);
};

let addEventsToDiv = function(element) {
  element.addEventListener('mousedown', ({clientY, clientX, target}) => {
    CURRENT_DIV = target;
    const {top, left} = CURRENT_DIV.getBoundingClientRect();

    X = clientX - left;
    Y = clientY - top;
  });

  element.addEventListener('mouseup', () => {
    CURRENT_DIV = null;
  });

  element.addEventListener('dblclick', newElement);
};

for (let i = 0; i < 6; i++) {
  let div = document.createElement('div');
  div.style.top = `${getR()}px`;
  div.style.left = `${getR()}px`;
  document.querySelector('body').appendChild(div);
}

let dives = document.querySelectorAll('div');

dives.forEach(div => {
  addEventsToDiv(div);
});

window.addEventListener('mousemove', event => {
  if (CURRENT_DIV) {
    CURRENT_DIV.style.left = `${event.clientX - X}px`;
    CURRENT_DIV.style.top = `${event.clientY - Y}px`;
  }
});
