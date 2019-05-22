//canvas는 그안에있는 픽셀을 다룰수있다.
const canvas = document.getElementById("jsCanvas");
//ctx는 context 이안에서 픽셀을 다루는것. 여기선 2d
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

//canvas를 css에서 크기정해줫지만 이안에서도 정해줘야한다.
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//그릴 선의 색.
ctx.strokeStyle = INITIAL_COLOR;
//그릴 fill의 색.
ctx.fillStyle = INITIAL_COLOR;
//그릴 선의 너비.
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    //console.log("creating path in", x, y);
    //그리지않을때는 패스를 시작.(패스는 선.)
    ctx.beginPath();
    //패스를 이동
    ctx.moveTo(x, y);
  } else {
    //console.log("creating line in", x, y);
    //마우스를 움직일때마다 발생
    //패스의 이전위치에서지금위치까지 선을연결.
    ctx.lineTo(x, y);
    //패스를 그림.
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = ctx.strokeStyle;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}
//                          |이건그냥아무이름이나.
Array.from(colors).forEach(colors =>
  colors.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}
