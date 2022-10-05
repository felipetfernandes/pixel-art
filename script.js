const colors = document.getElementsByClassName('color');
const button = document.getElementById('button-random-color');
const pixelBoard = document.getElementById('pixel-board');
const colorBoard = document.getElementById('color-palette');

function randomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateColor() {
  const colorPalette = [];
  let color = '';
  for (let index = 0; index < 4; index += 1) {
    if (index === 0) {
      color = '#000';
    } else {
      color = randomColor();
    }
    colors[index].style.backgroundColor = color;
    colorPalette.push(color);
  }

  localStorage.setItem('colorPalette', JSON.stringify(colorPalette));
}

function localColor() {
  const colorPalette = JSON.parse(localStorage.getItem('colorPalette'));
  if (colorPalette != null) {
    for (let index = 0; index < colorPalette.length; index += 1) {
      colors[index].style.backgroundColor = colorPalette[index];
    }
  } else {
    generateColor();
  }
}

function createBoard(number) {
  for (let index = 0; index < number * number; index += 1) {
    const div = document.createElement('div');
    div.className = 'pixel';
    div.style.backgroundColor = '#ffffff';
    pixelBoard.appendChild(div);
  }
  pixelBoard.style = `grid-template-columns: repeat(${number}, 40px)`;
}

function selectColor() {
  const newSelected = window.event.target;
  const selected = document.getElementsByClassName('selected')[0];
  if (newSelected.className === 'color') {
    selected.className = 'color';
    newSelected.className = 'color selected';
  }
}

function paint() {
  const painted = window.event.target;
  const selectedColor = document.getElementsByClassName('selected')[0];
  if (painted.className === 'pixel') {
    painted.style.backgroundColor = selectedColor.style.backgroundColor;
  }
}

createBoard(5);
localColor();

button.addEventListener('click', generateColor);
colorBoard.addEventListener('click', selectColor);
pixelBoard.addEventListener('click', paint);
