let mouse_down = false;

let color = "#000000";
let erasing = false;
function paintColor() {
  if (erasing) {
    return "#ffffff";
  } else {
    return color;
  }
}

function newSquare(sqSize) {
  let sq = document.createElement("div");
  sq.classList.add("square");
  sq.style.width = `${sqSize}%`;
  sq.style.height = `${sqSize}%`;
  sq.addEventListener("mouseenter", (e) => {
    if (mouse_down) {
      sq.style.backgroundColor = paintColor();
    }
  });
  sq.addEventListener(
    "mousedown",
    () => (sq.style.backgroundColor = paintColor()),
  );
  return sq;
}

function newGrid(sideLen) {
  let sq_size = 100 / sideLen;
  let sketch = document.querySelector(".sketch");
  for (let i = 0; i < sideLen * sideLen; ++i) {
    let sq = newSquare(sq_size);
    if (sideLen > 25) {
      sq.style.border = "none";
    }
    sketch.appendChild(sq);
  }
}
function clearGrid() {
  let squares = document.querySelectorAll(".square");
  squares.forEach((sq) => {
    sq.style.backgroundColor = "#ffffff";
  });
}
function deleteGrid() {
  let squares = document.querySelectorAll(".square");
  squares.forEach((sq) => {
    sq.remove();
  });
}

let colorchooser = document.querySelector(".colorchooser");
colorchooser.value = "#000000";
colorchooser.addEventListener("input", (e) => {
  color = colorchooser.value;
});
document
  .querySelector(".pen")
  .addEventListener("click", () => (erasing = false));
document
  .querySelector(".eraser")
  .addEventListener("click", () => (erasing = true));

let sketch = document.querySelector(".sketch");
sketch.addEventListener("mousedown", (e) => {
  mouse_down = true;
  e.preventDefault();
});
document.addEventListener("mouseup", () => (mouse_down = false));

let newGridButton = document.querySelector(".new-grid");
newGridButton.addEventListener("click", () => {
  let size = NaN;

  while (Number.isNaN(size) || size >= 100) {
    let prompt = window.prompt("New grid size (less than 100):");
    if (prompt == null) {
      return;
    }
    size = parseInt(prompt);
  }
  deleteGrid();
  newGrid(size);
});
let clearGridButton = document.querySelector(".clear");
clearGridButton.addEventListener("click", () => clearGrid());

newGrid(16);
