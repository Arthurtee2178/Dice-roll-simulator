const buttonEl = document.getElementById("roll-button");
const diceEls = document.querySelectorAll(".dice");
const rollHistoryEl = document.getElementById("roll-history");

let historyList = [];

function rollDice() {
  // Two independent dice (1-6)
  const d1 = Math.floor(Math.random() * 6) + 1;
  const d2 = Math.floor(Math.random() * 6) + 1;

  // Update the visible dice (graceful fallback if only one exists)
  if (diceEls.length >= 2) {
    diceEls[0].innerHTML = getDiceFace(d1);
    diceEls[1].innerHTML = getDiceFace(d2);
  } else if (diceEls.length === 1) {
    diceEls[0].innerHTML = getDiceFace(d1);
  }

  // Save history as an object so we keep both values
  historyList.push({ d1, d2 });
  updateRollHistory();

 
  if (d1 === 6 && d2 === 6) 
    alert('Double six!');
  else if(d1 === 5 && d2 === 5) 
    alert('Double five!');
  else if(d1 === 4 && d2 === 4) 
    alert('Double four!');
  else if(d1 === 3 && d2 === 3) 
    alert('Double three!');
  else if(d1 === 2 && d2 === 2) 
    alert('Double two');
  else if(d1 === 1 && d2 === 1) 
    alert('Double one!');
}

function updateRollHistory() {
  rollHistoryEl.innerHTML = "";
  // Show newest first
  const entries = historyList.slice().reverse();
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const rollNumber = historyList.length - i;
    const listItem = document.createElement("li");
    listItem.innerHTML = `Roll ${rollNumber}: <span>${getDiceFace(
      entry.d1
    )}</span> <span>${getDiceFace(entry.d2)}</span> <strong>(${entry.d1} + ${entry.d2} = ${
      entry.d1 + entry.d2
    })</strong>`;
    rollHistoryEl.appendChild(listItem);
  }
}

function getDiceFace(rollResult) {
  switch (rollResult) {
    case 1:
      return "&#9856;";
    case 2:
      return "&#9857;";
    case 3:
      return "&#9858;";
    case 4:
      return "&#9859;";
    case 5:
      return "&#9860;";
    case 6:
      return "&#9861;";
    default:
      return "";
  }
}

buttonEl.addEventListener("click", () => {
  // Short animation then reveal result
  const animationTime = 800; // ms
  diceEls.forEach((el) => {
    // ensure the animation duration matches the timeout
    el.style.animationDuration = animationTime + "ms";
    el.classList.add("roll-animation");
  });

  setTimeout(() => {
    rollDice();
    diceEls.forEach((el) => {
      el.classList.remove("roll-animation");
      el.style.animationDuration = "";
    });
  }, animationTime);
});


