const colors = document.getElementsByClassName('color');
const buttonColor = document.getElementById('button-random-color');
const buttonClear = document.getElementById('clear-board');
const buttonGenerate = document.getElementById('generate-board');
const input = document.getElementById('board-size');
const pixelBoard = document.getElementById('pixel-board');
const colorBoard = document.getElementById('color-palette');

let size = 0;
if (JSON.parse(localStorage.getItem('boardSize')) != null) {
  size = JSON.parse(localStorage.getItem('boardSize'));
} else {
  size = 5;
}

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

function loadColor() {
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

function resetBoard() {
  while (pixelBoard.firstChild) {
    pixelBoard.removeChild(pixelBoard.firstChild);
  }
  createBoard(size);
  localStorage.setItem('boardSize', size);
  localStorage.removeItem('pixelBoard');
  savedDrawing = {};
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

function loadDrawing() {
  const pixels = document.getElementsByClassName('pixel');
  savedDrawing = JSON.parse(localStorage.getItem('pixelBoard'));
  if (savedDrawing !== null) {
    for (let index = 0; index < pixels.length; index += 1) {
      pixels[index].style.backgroundColor = savedDrawing[index];
    }
  } else {
    savedDrawing = {};
  }
}

function newBoard() {
  size = input.value;
  switch (true) {
  case size === '':
    window.alert('Board inválido!');
    break;
  case size < 5:
    size = 5;
    resetBoard();
    break;
  case size > 50:
    size = 50;
    resetBoard();
    break;
  default:
    resetBoard();
  }
}

createBoard(size);
loadColor();
loadDrawing();

buttonColor.addEventListener('click', generateColor);
buttonClear.addEventListener('click', resetBoard);
buttonGenerate.addEventListener('click', newBoard);
colorBoard.addEventListener('click', selectColor);
pixelBoard.addEventListener('click', paint);
