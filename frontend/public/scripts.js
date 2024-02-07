// Ref: https://developer.mozilla.org/fr/docs/Web/API/Canvas_API
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const increaseButton = document.getElementById("increase");
const decreaseButton = document.getElementById("decrease");
const sizeElement = document.getElementById("size");
const colorElement = document.getElementById("color");
const clearElement = document.getElementById("clear");
const saveButton = document.getElementById("save");
const loadButton = document.getElementById("load");
const downloadButton = document.getElementById("download");

let size = 1;
let color = "black";
let x;
let y;
let isPressed = false;
let score = 1;

const drawCircle = (x, y) => {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
};

const drawLine = (x1, y1, x2, y2) => {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
};

const updateSizeOnScreen = () => (sizeElement.innerText = size);

canvas.addEventListener("mousedown", (e) => {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
  isPressed = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    x2 = e.offsetX;
    y2 = e.offsetY;
    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;

  }
});

canvas.addEventListener("touchstart", (e) => {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("touchend", (e) => {
  isPressed = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener("touchmove", function (e) {
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);

increaseButton.addEventListener("click", () => {
  size += 1;
  if (size > 15) size = 15;
  updateSizeOnScreen();
});

decreaseButton.addEventListener("click", () => {
  size -= 1;
  if (size < 1) size = 1;
  updateSizeOnScreen();
});

colorElement.addEventListener("change", (e) => (color = e.target.value));

clearElement.addEventListener("click", () =>
  ctx.clearRect(0, 0, canvas.width, canvas.height)
);

if (localStorage.getItem("imgCanvas")!= null){
  var img = new Image();
  img.onload = function(){
      ctx.drawImage(img, 0,0);
  }
}

saveButton.addEventListener("click", () => {
  const Nameplayer = prompt("Enter your name:");
  localStorage.setItem("imgCanvas", canvas.toDataURL());
  if (Nameplayer) {
    handleAddEntry(Nameplayer);
  }
  if (typeof localStorage !== "undefined") {
    console.log("Image saved to local storage.");
  } 
  else {
    window.alert("Your browser does not support local storage");
  }

  
});

loadButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var img = new Image();
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
  };
  img.src = localStorage.getItem("imgCanvas");
});
var formData = new FormData();
formData.append("image", canvas.toDataURL());

downloadButton.addEventListener("click", () => {
  const imageDataURI = localStorage.getItem("imgCanvas");
  if (imageDataURI) {
    const link = document.createElement("a");
    link.href = imageDataURI;
    link.download = "sticky.png"; 
    link.click();
  } 
  else {
    window.alert("No image found in local storage to download.");
  }
});

function toggleLeaderboard() {
  if (leaderboardContainer.style.display === "none") {
      leaderboardContainer.style.display = "block";
      toggleLeaderboardButton.textContent = "Hide Leaderboard";
  } else {
      leaderboardContainer.style.display = "none";
      toggleLeaderboardButton.textContent = "Show Leaderboard";
  }
}

toggleLeaderboardButton.addEventListener("click", toggleLeaderboard);

function gameOver() {
  clearInterval(timer); // Stop the timer if the game ends
  startButton.disabled = false;
  wordInput.disabled = true;
  wordDisplay.textContent = "Game Over";
  timerDisplay.textContent = "";

  const finalScore = score;

  const Nameplayer = prompt("Enter your name:");

  if (Nameplayer) {
      handleAddEntry(Nameplayer,finalScore);
  }
}

let sortByScoreDescending = false; // Initially ascending

function toggleSortOrder() {
  sortByScoreDescending = !sortByScoreDescending;
  const sortButtonText = sortByScoreDescending ? "Sort by Score (Descending)" : "Sort by Score (Ascending)";
  sortButton.textContent = sortButtonText;
  updateLeaderboard();
}

function updateLeaderboard() {
  const leaderboardList = document.getElementById("leaderboard-list");
  const entries = Array.from(leaderboardList.children);

  entries.sort((a, b) => {
      const scoreA = parseInt(a.textContent.split(":")[1]);
      const scoreB = parseInt(b.textContent.split(":")[1]);
      return sortByScoreDescending ? scoreB - scoreA : scoreA - scoreB;
  });

  leaderboardList.innerHTML = "";

  entries.forEach((entry) => {
      leaderboardList.appendChild(entry);
  });
}

const sortButton = document.getElementById("sort-button");
sortButton.addEventListener("click", toggleSortOrder);

updateLeaderboard();