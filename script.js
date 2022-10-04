const colors = document.getElementsByClassName('color');

function generateColor() {
  for (let index = 1; index < 4; index += 1) {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    colors[index].style = `background-color: ${color}`;
  }
}

generateColor();
