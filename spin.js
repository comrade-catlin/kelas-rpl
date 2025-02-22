let options = [];
let rotation = 0;
const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const radius = canvas.width / 2;
let spinning = false;

function addInput() {
    const input = document.getElementById("newInput").value.trim();
    if (input && !options.includes(input)) {
        options.push(input);
        document.getElementById("newInput").value = "";
        updateInputList();
        drawWheel();
    }
}

function updateInputList() {
    const listDiv = document.getElementById("inputList");
    listDiv.innerHTML = "<h3>Options:</h3>" + options.map(opt => `<p>${opt}</p>`).join("");
}

function drawWheel() {
const total = options.length;
if (total === 0) return;
ctx.clearRect(0, 0, canvas.width, canvas.height);
let startAngle = 0;

for (let i = 0; i < total; i++) {
let angle = (2 * Math.PI) / total;
ctx.beginPath();
ctx.moveTo(radius, radius);
ctx.arc(radius, radius, radius, startAngle, startAngle + angle);
ctx.fillStyle = i % 2 === 0 ? "#03fa6e" : "#028a48"; // Alternating theme colors
ctx.fill();
ctx.closePath();

ctx.save();
ctx.translate(radius, radius);
ctx.rotate(startAngle + angle / 2);
ctx.fillStyle = "#000"; // Make text black
ctx.font = "bold 14px Arial";
ctx.fillText(options[i], radius / 2.5, 5);
ctx.restore();

startAngle += angle;
}
}


function spinWheel() {
    if (options.length === 0 || spinning) return;
    spinning = true;
    let spinTime = 3000;
    let finalAngle = Math.random() * 360 + 1440;
    
    canvas.style.transform = `rotate(${rotation + finalAngle}deg)`;
    rotation += finalAngle;
    
    setTimeout(() => {
        spinning = false;
        determineWinner();
    }, spinTime);
}
function determineWinner() {
    setTimeout(() => {
        if (userList.length === 0) {
            alert("No more users left!");
            return;
        }

        const winningIndex = Math.floor(Math.random() * userList.length);
        const winner = userList[winningIndex];

        // Show the winner in the modal with delay
        showWinnerModal(winner);

        // Delay the elimination after 2 seconds
        setTimeout(() => {
            eliminateUser(winningIndex);
        }, 2000);

    }, 2000); // Delay before displaying the winner
}

function showWinnerModal(winner) {
    const modal = document.getElementById("winnerModal");
    const winnerText = document.getElementById("winnerText");

    winnerText.textContent = `Winner: ${winner}`;
    modal.style.display = "block";

    // Ensure modal disappears on mobile as well
    setTimeout(() => {
        modal.style.display = "none";
    }, 2000);
}

function eliminateUser(index) {
    userList.splice(index, 1); // Remove winner from list
    updateUserDisplay(); // Refresh user list UI

    // Ensure re-rendering works on mobile
    setTimeout(() => {
        drawWheel();
    }, 500); // Slight delay before updating UI
}

drawWheel();


