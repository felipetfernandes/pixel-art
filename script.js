const colors = document.getElementsByClassName('color');
const button = document.getElementById('button-random-color');
const pixelBoard = document.getElementById('pixel-board');

function generateColor() {
  const colorPalette = [];
  for (let index = 1; index < 4; index += 1) {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
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
      colors[index + 1].style.backgroundColor = colorPalette[index];
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

createBoard(5);
localColor();
button.addEventListener('click', generateColor);
