const colors = document.getElementsByClassName('color');
const button = document.getElementById('button-random-color');

function generateColor() {
  for (let index = 1; index < 4; index += 1) {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    colors[index].style.backgroundColor = color;
    localStorage.setItem(`colorPalette${index}`, color);
  }
}

function localColor() {
  if (localStorage.colorPalette1 != null) {
    colors[1].style.backgroundColor = localStorage.colorPalette1;
    colors[2].style.backgroundColor = localStorage.colorPalette2;
    colors[3].style.backgroundColor = localStorage.colorPalette3;
  } else {
    generateColor();
  }
}

localColor();
button.addEventListener('click', generateColor);
