const colors = document.getElementsByClassName('color');
const buttonColor = document.getElementById('button-random-color');
const buttonClear = document.getElementById('clear-board');
const pixelBoard = document.getElementById('pixel-board');
const colorBoard = document.getElementById('color-palette');
let savedDrawing = {};

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
      color = '#000000';
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
    div.id = index;
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
    savedDrawing[painted.id] = selectedColor.style.backgroundColor;
    localStorage.setItem('pixelBoard', JSON.stringify(savedDrawing));
  }
}

function clearBoard() {
  const pixels = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = '#ffffff';
  }
  localStorage.removeItem('pixelBoard');
  savedDrawing = {};
}

function loadDrawing() {
  const pixels = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    savedDrawing = JSON.parse(localStorage.getItem('pixelBoard'));
    if (savedDrawing !== null) {
      pixels[index].style.backgroundColor = savedDrawing[index];
    } else {
      savedDrawing = {};
    }
  }
}

createBoard(5);
localColor();
loadDrawing();

buttonColor.addEventListener('click', generateColor);
buttonClear.addEventListener('click', clearBoard);
colorBoard.addEventListener('click', selectColor);
pixelBoard.addEventListener('click', paint);
